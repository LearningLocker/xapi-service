import commonS3Repo from 'jscommons/dist/s3Repo';
import StorageRepo from '../repoFactory/StorageRepo';
import Config from './Config';
import deleteProfileContent from './deleteProfileContent';
import getProfileContent from './getProfileContent';
import storeProfileContent from './storeProfileContent';

export default (config: Config): StorageRepo => {
  return {
    ...commonS3Repo(config),
    deleteProfileContent: deleteProfileContent(config),
    getProfileContent: getProfileContent(config),
    storeProfileContent: storeProfileContent(config),
  };
};
