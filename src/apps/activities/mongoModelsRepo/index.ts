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
    clearRepo: async () => {
      await (await config.db()).dropDatabase();
    },
    deleteProfile: deleteProfile(config),
    getProfile: getProfile(config),
    getProfiles: getProfiles(config),
    hasProfile: hasProfile(config),
    migrate: () => Promise.resolve(),
    overwriteProfile: overwriteProfile(config),
    patchProfile: patchProfile(config),
    rollback: () => Promise.resolve(),
  };
};
