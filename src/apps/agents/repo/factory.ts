import Repo from '../repoFactory/Repo';
import authFactory from './auth/factory';
import FactoryConfig from './FactoryConfig';
import modelsFactory from './models/factory';
import storageFactory from './storage/factory';

export default (factoryConfig: FactoryConfig): Repo => {
  const authFacade = authFactory(factoryConfig.auth);
  const modelsFacade = modelsFactory(factoryConfig.models);
  const storageFacade = storageFactory(factoryConfig.storage);

  return {
    ...authFacade,
    ...modelsFacade,
    ...storageFacade,

    clearRepo: async () => {
      await modelsFacade.clearRepo();
      await storageFacade.clearRepo();
    },
    migrate: async () => {
      await modelsFacade.migrate();
      await storageFacade.migrate();
    },
    rollback: async () => {
      await modelsFacade.rollback();
      await storageFacade.rollback();
    },
  };
};
