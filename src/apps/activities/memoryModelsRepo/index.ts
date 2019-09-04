import commonMemoryRepo from 'jscommons/dist/memoryRepo';
import ModelsRepo from '../repoFactory/ModelsRepo';
import Config from './Config';
import deleteProfile from './deleteProfile';
import getProfile from './getProfile';
import getProfiles from './getProfiles';
import hasProfile from './hasProfile';
import overwriteProfile from './overwriteProfile';
import patchProfile from './patchProfile';

export default (config: Config): ModelsRepo => {
  return {
    deleteProfile: deleteProfile(config),
    getProfile: getProfile(config),
    getProfiles: getProfiles(config),
    hasProfile: hasProfile(config),
    overwriteProfile: overwriteProfile(config),
    patchProfile: patchProfile(config),
    ...commonMemoryRepo(config),
  };
};
