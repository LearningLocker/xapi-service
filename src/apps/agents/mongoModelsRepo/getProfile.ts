import NoModel from 'jscommons/dist/errors/NoModel';
import { defaultTo } from 'lodash';
import GetProfileOptions from '../repoFactory/options/GetProfileOptions';
import GetProfileResult from '../repoFactory/results/GetProfileResult';
import Config from './Config';
import { COLLECTION_NAME } from './utils/constants';
import getProfileFilter from './utils/getProfileFilter';

export default (config: Config) => {
  return async (opts: GetProfileOptions): Promise<GetProfileResult> => {
    const collection = (await config.db()).collection(COLLECTION_NAME);
    const filter = getProfileFilter(opts);
    const document = await collection.findOne(filter);

    if (document === null || document === undefined) {
      /* istanbul ignore next */
      throw new NoModel('Agent Profile');
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
