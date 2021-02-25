import StorageRepo from '../repoFactory/StorageRepo';
import clearRepo from './clearRepo';
import Config from './Config';
import deleteProfileContent from './deleteProfileContent';
import getProfileContent from './getProfileContent';
import storeProfileContent from './storeProfileContent';

export default (config: Config): StorageRepo => {
  return {
    clearRepo: clearRepo(config),
    migrate: async () => Promise.resolve(),
    rollback: async () => Promise.resolve(),
    deleteProfileContent: deleteProfileContent(config),
    getProfileContent: getProfileContent(config),
    storeProfileContent: storeProfileContent(config),
  };
};
