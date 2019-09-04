import NoModel from 'jscommons/dist/errors/NoModel';
import { ObjectID } from 'mongodb';
import IfMatch from '../errors/IfMatch';
import DeleteProfileOptions from '../repoFactory/options/DeleteProfileOptions';
import DeleteProfileResult from '../repoFactory/results/DeleteProfileResult';
import Config from './Config';
import { COLLECTION_NAME } from './utils/constants';

export default (config: Config) => {
  return async (opts: DeleteProfileOptions): Promise<DeleteProfileResult> => {
    const collection = (await config.db()).collection(COLLECTION_NAME);

    // Docs: https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Communication.md#concurrency
    const etagFilter = (
      opts.ifMatch !== undefined
        ? { etag: opts.ifMatch }
        : {}
    );

    const profileFilter = {
      activityId: opts.activityId,
      lrs: new ObjectID(opts.client.lrs_id),
      organisation: new ObjectID(opts.client.organisation),
      profileId: opts.profileId,
    };

    // Deletes the document if it matches the profile and etag filters.
    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndDelete
    // Docs: http://bit.ly/findAndModifyWriteOpResult
    const opResult = await collection.findOneAndDelete({
      ...profileFilter,
      ...etagFilter,
    }, {});

    // Determines if the identifier was deleted.
    // Docs: https://docs.mongodb.com/manual/reference/command/getLastError/#getLastError.n
    const matchedDocuments = opResult.lastErrorObject.n as number;
    const wasDeleted = matchedDocuments === 1;

    // Returns the result of the deletion if the document was deleted.
    if (wasDeleted) {
      const deletedDoc = opResult.value;
      return {
        contentType: deletedDoc.contentType,
        extension: deletedDoc.extension,
        id: deletedDoc._id.toString(),
      };
    }

    // Attempts to find document without the ETag filter to determine if there was an ETag error.
    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOne
    const foundDoc = await collection.findOne(profileFilter, {});
    if (foundDoc !== null && foundDoc !== undefined) {
      throw new IfMatch();
    }

    /* istanbul ignore next */
    throw new NoModel('Activity Profile');
  };
};
