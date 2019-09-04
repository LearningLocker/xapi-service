import StorageRepo from '../repoFactory/StorageRepo';
import clearRepo from './clearRepo';
import Config from './Config';
import deleteStateContent from './deleteStateContent';
import deleteStatesContent from './deleteStatesContent';
import getStateContent from './getStateContent';
import storeStateContent from './storeStateContent';

export default (config: Config): StorageRepo => {
  return {
    clearRepo: clearRepo(config),
    deleteStateContent: deleteStateContent(config),
    deleteStatesContent: deleteStatesContent(config),
    getStateContent: getStateContent(config),
    migrate: async () => Promise.resolve(),
    rollback: async () => Promise.resolve(),
    storeStateContent: storeStateContent(config),
  };
};
