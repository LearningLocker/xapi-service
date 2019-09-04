/* tslint:disable:max-file-line-count */
import { isPlainObject } from 'lodash';
import IfMatch from '../errors/IfMatch';
import IfNoneMatch from '../errors/IfNoneMatch';
import MaxEtags from '../errors/MaxEtags';
import OverwriteProfileOptions from '../repoFactory/options/OverwriteProfileOptions';
import OverwriteProfileResult from '../repoFactory/results/OverwriteProfileResult';
import Config from './Config';
import { COLLECTION_NAME } from './utils/constants';
import getEtagFilter from './utils/getEtagFilter';
import getProfileFilter from './utils/getProfileFilter';

// Within this code, Etags (ifMatch/ifNoneMatch) are used to manage concurrent creates/updates.
// Docs: https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Communication.md#concurrency

export default (config: Config) => {
  return async (opts: OverwriteProfileOptions): Promise<OverwriteProfileResult> => {
    const collection = (await config.db()).collection(COLLECTION_NAME);
    const checkIfMatch = opts.ifMatch !== undefined;
    const checkIfNoneMatch = opts.ifNoneMatch === '*';

    if (checkIfMatch && checkIfNoneMatch) {
      throw new MaxEtags();
    }

    const profileFilter = getProfileFilter(opts);
    const update = {
      // Overwrites the content and contentType.
      content: opts.content,
      contentType: opts.contentType,
      etag: opts.etag,
      extension: opts.extension,
      isObjectContent: isPlainObject(opts.content),

      // Updates updatedAt time.
      updatedAt: new Date(),
    };

    // Attempts to update the profile because the ifMatch option is provided.
    if (checkIfMatch) {
      const ifMatchFilter = getEtagFilter(opts.ifMatch);

      // Updates the profile if it exists with the correct ETag.
      const updateOpResult = await collection.findOneAndUpdate({
        ...ifMatchFilter,
        ...profileFilter,
      }, {
          $set: update,
        }, {
          returnOriginal: false,
          upsert: false,
        });

      // Determines if the Profile was updated.
      const updatedDocuments = updateOpResult.lastErrorObject.n as number;
      if (updatedDocuments === 1) {
        return {
          extension: updateOpResult.value.extension,
          id: updateOpResult.value._id.toString(),
        };
      }
    }

    // Creates the profile if it doesn't already exist.
    const createOpResult = await collection.findOneAndUpdate(profileFilter, {
      $setOnInsert: update,
    }, {
        returnOriginal: false,
        upsert: true,
      });

    // Determines if the Profile was created or found.
    const wasCreated = createOpResult.lastErrorObject.upserted !== undefined;

    // Throws the IfMatch error when the profile already exists.
    // This is because there must have been an ETag mismatch in the previous update.
    if (!wasCreated && checkIfMatch) {
      throw new IfMatch();
    }

    if (!wasCreated && checkIfNoneMatch) {
      throw new IfNoneMatch();
    }

    return {
      extension: createOpResult.value.extension,
      id: createOpResult.value._id.toString(),
    };
  };
};
