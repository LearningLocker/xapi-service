/* tslint:disable:max-file-line-count */
import { mapKeys } from 'lodash';
import { ObjectID } from 'mongodb';
import IfMatch from '../errors/IfMatch';
import IfNoneMatch from '../errors/IfNoneMatch';
import MaxEtags from '../errors/MaxEtags';
import NonJsonObject from '../errors/NonJsonObject';
import PatchProfileOptions from '../repoFactory/options/PatchProfileOptions';
import { jsonContentType } from '../utils/constants';
import Config from './Config';
import { COLLECTION_NAME } from './utils/constants';

// Within this code, Etags (ifMatch/ifNoneMatch) are used to manage concurrent creates/updates.
// Docs: https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Communication.md#concurrency

export default (config: Config) => {
  return async (opts: PatchProfileOptions): Promise<void> => {
    const collection = (await config.db()).collection(COLLECTION_NAME);
    const checkIfMatch = opts.ifMatch !== undefined;
    const checkIfNoneMatch = opts.ifNoneMatch === '*';

    if (checkIfMatch && checkIfNoneMatch) {
      throw new MaxEtags();
    }

    // Filters out non-JSON objects.
    const jsonObjectFilter = {
      contentType: jsonContentType,
      isObjectContent: true,
    };

    const profileFilter = {
      activityId: opts.activityId,
      lrs: new ObjectID(opts.client.lrs_id),
      organisation: new ObjectID(opts.client.organisation),
      profileId: opts.profileId,
    };

    // Ensures that the content is patched and not overwritten.
    const contentPatch = mapKeys(opts.content, (_value, key) => {
      return `content.${key}`;
    });

    const update = {
      // Overwrites the content and contentType.
      contentType: jsonContentType,
      etag: opts.etag,
      extension: 'json',
      isObjectContent: true,

      // Updates updatedAt time.
      updatedAt: new Date(),
    };

    // Attempts to patch the profile because the ifNoneMatch option isn't provided.
    if (!checkIfNoneMatch) {
      const ifMatchFilter = checkIfMatch ? { etag: opts.ifMatch } : {};

      // Updates the profile if it exists with JSON object content and the correct ETag.
      // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate
      // Docs: http://bit.ly/findAndModifyWriteOpResult
      const updateOpResult = await collection.findOneAndUpdate({
        ...ifMatchFilter,
        ...jsonObjectFilter,
        ...profileFilter,
      }, {
          $set: {
            ...contentPatch,
            ...update,
          },
        }, {
          returnOriginal: false, // Ensures the updated document is returned.
          upsert: false, // Does not create the profile when it doesn't exist.
        });

      // Determines if the Profile was updated.
      // Docs: https://docs.mongodb.com/manual/reference/command/getLastError/#getLastError.n
      const updatedDocuments = updateOpResult.lastErrorObject.n as number;
      if (updatedDocuments === 1) {
        return;
      }
    }

    // Creates the profile if it doesn't already exist.
    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate
    // Docs: http://bit.ly/findAndModifyWriteOpResult
    const createOpResult = await collection.findOneAndUpdate(profileFilter, {
      $setOnInsert: {
        content: opts.content,
        ...update,
      },
    }, {
        returnOriginal: false, // Ensures the updated document is returned.
        upsert: true, // Creates the profile when it's not found.
      });

    // Determines if the Profile was created or found.
    // Docs: https://docs.mongodb.com/manual/reference/command/getLastError/#getLastError.n
    const wasCreated = createOpResult.lastErrorObject.upserted !== undefined;

    // When the profile is found at the create stage but not the update stage,
    // And the ifNoneMatch option was not provided.
    // Then the exsting profile either has the wrong content or didn't match the ifMatch option.
    if (!wasCreated && !checkIfNoneMatch) {
      if (checkIfMatch && createOpResult.value.etag !== opts.ifMatch) {
        throw new IfMatch();
      }
      throw new NonJsonObject();
    }

    // When the ifNoneMatch option is provided.
    // No profile should be created when it already exists, hence we throw this error.
    if (!wasCreated && checkIfNoneMatch) {
      throw new IfNoneMatch();
    }

    return;
  };
};
