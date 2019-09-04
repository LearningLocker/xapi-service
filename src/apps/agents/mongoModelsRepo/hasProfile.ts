import HasProfileOptions from '../repoFactory/options/HasProfileOptions';
import HasProfileResult from '../repoFactory/results/HasProfileResult';
import Config from './Config';
import { COLLECTION_NAME } from './utils/constants';
import getProfileFilter from './utils/getProfileFilter';

export default (config: Config) => {
  return async (opts: HasProfileOptions): Promise<HasProfileResult> => {
    const collection = (await config.db()).collection(COLLECTION_NAME);
    const filter = getProfileFilter(opts);
    const document = await collection.findOne(filter, { fields: { _id: 0 } });
    const hasProfile = document !== null && document !== undefined;
    return { hasProfile };
  };
};
