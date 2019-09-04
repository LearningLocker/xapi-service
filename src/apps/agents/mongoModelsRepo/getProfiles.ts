/* tslint:disable:deprecation - find isn't really deprecated */
import GetProfilesOptions from '../repoFactory/options/GetProfilesOptions';
import GetProfilesResult from '../repoFactory/results/GetProfilesResult';
import Config from './Config';
import { COLLECTION_NAME } from './utils/constants';
import getProfilesFilter from './utils/getProfilesFilter';
import getSinceFilter from './utils/getSinceFilter';

export default (config: Config) => {
  return async (opts: GetProfilesOptions): Promise<GetProfilesResult> => {
    const collection = (await config.db()).collection(COLLECTION_NAME);
    const filter = {
      ...getProfilesFilter(opts),
      ...getSinceFilter(opts.since),
    };
    const documents = await collection.find(filter).project({ profileId: 1 }).toArray();
    const profileIds = documents.map((document) => {
      return document.profileId;
    });
    return { profileIds };
  };
};
