import commonS3Repo from 'jscommons/dist/s3Repo';
import StorageRepo from '../repoFactory/StorageRepo';
import Config from './Config';
import deleteStateContent from './deleteStateContent';
import deleteStatesContent from './deleteStatesContent';
import getStateContent from './getStateContent';
import storeStateContent from './storeStateContent';

export default (config: Config): StorageRepo => {
  return {
    ...commonS3Repo(config),
    deleteStateContent: deleteStateContent(config),
    deleteStatesContent: deleteStatesContent(config),
    getStateContent: getStateContent(config),
    storeStateContent: storeStateContent(config),
  };
};
