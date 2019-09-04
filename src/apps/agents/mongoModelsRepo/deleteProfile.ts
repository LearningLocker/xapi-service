import NoModel from 'jscommons/dist/errors/NoModel';
import IfMatch from '../errors/IfMatch';
import DeleteProfileOptions from '../repoFactory/options/DeleteProfileOptions';
import DeleteProfileResult from '../repoFactory/results/DeleteProfileResult';
import Config from './Config';
import { COLLECTION_NAME } from './utils/constants';
import getEtagFilter from './utils/getEtagFilter';
import getProfileFilter from './utils/getProfileFilter';

// Within this code, Etags (ifMatch/ifNoneMatch) are used to manage concurrent creates/updates.
// Docs: https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Communication.md#concurrency

export default (config: Config) => {
  return async (opts: DeleteProfileOptions): Promise<DeleteProfileResult> => {
    const collection = (await config.db()).collection(COLLECTION_NAME);
    const etagFilter = getEtagFilter(opts.ifMatch);
    const profileFilter = getProfileFilter(opts);

    // Deletes the document if it matches the profile and etag filters.
    const opResult = await collection.findOneAndDelete({
      ...profileFilter,
      ...etagFilter,
    }, {});

    // Determines if the identifier was deleted.
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
    const foundDoc = await collection.findOne(profileFilter, {});
    if (foundDoc !== null && foundDoc !== undefined) {
      throw new IfMatch();
    }

    /* istanbul ignore next */
    throw new NoModel('Agent Profile');
  };
};
