/* tslint:disable:max-file-line-count */
import { mapKeys } from 'lodash';
import NonJsonObject from '../errors/NonJsonObject';
import PatchStateOptions from '../repoFactory/options/PatchStateOptions';
import { jsonContentType } from '../utils/constants';
import Config from './Config';
import { COLLECTION_NAME } from './utils/constants';
import getStateFilter from './utils/getStateFilter';

export default (config: Config) => {
  return async (opts: PatchStateOptions): Promise<void> => {
    const collection = (await config.db()).collection(COLLECTION_NAME);

    // Filters out non-JSON objects.
    const jsonObjectFilter = {
      contentType: jsonContentType,
      isObjectContent: true,
    };

    const stateFilter = getStateFilter(opts);

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

    // Updates the state if it exists with JSON object content and the correct ETag.
    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate
    // Docs: http://bit.ly/findAndModifyWriteOpResult
    const updateOpResult = await collection.findOneAndUpdate({
      ...jsonObjectFilter,
      ...stateFilter,
    }, {
        $set: {
          ...contentPatch,
          ...update,
        },
      }, {
        returnOriginal: false, // Ensures the updated document is returned.
        upsert: false, // Does not create the state when it doesn't exist.
      });

    // Determines if the State was updated.
    // Docs: https://docs.mongodb.com/manual/reference/command/getLastError/#getLastError.n
    const updatedDocuments = updateOpResult.lastErrorObject.n as number;
    if (updatedDocuments === 1) {
      return;
    }

    // Creates the state if it doesn't already exist.
    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate
    // Docs: http://bit.ly/findAndModifyWriteOpResult
    const createOpResult = await collection.findOneAndUpdate(stateFilter, {
      $setOnInsert: {
        content: opts.content,
        ...update,
      },
    }, {
        returnOriginal: false, // Ensures the updated document is returned.
        upsert: true, // Creates the state when it's not found.
      });

    // Determines if the State was created or found.
    // Docs: https://docs.mongodb.com/manual/reference/command/getLastError/#getLastError.n
    const wasCreated = createOpResult.lastErrorObject.upserted !== undefined;

    // When the state is found at the create stage but not the update stage,
    // Then the exsting state has the wrong content
    if (!wasCreated) {
      throw new NonJsonObject();
    }

    return;
  };
};
