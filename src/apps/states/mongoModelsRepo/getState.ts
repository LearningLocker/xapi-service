import NoModel from 'jscommons/dist/errors/NoModel';
import { defaultTo } from 'lodash';
import GetStateOptions from '../repoFactory/options/GetStateOptions';
import GetStateResult from '../repoFactory/results/GetStateResult';
import Config from './Config';
import { COLLECTION_NAME } from './utils/constants';
import getStateFilter from './utils/getStateFilter';

export default (config: Config) => {
  return async (opts: GetStateOptions): Promise<GetStateResult> => {
    const collection = (await config.db()).collection(COLLECTION_NAME);
    const filter = getStateFilter(opts);

    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOne
    const document = await collection.findOne(filter);

    if (document === null || document === undefined) {
      /* istanbul ignore next */
      throw new NoModel('State');
    }

    return {
      content: defaultTo<any>(document.content, undefined),
      contentType: document.contentType,
      etag: document.etag,
      extension: document.extension,
      id: document._id.toString(),
      updatedAt: document.updatedAt,
    };
  };
};
