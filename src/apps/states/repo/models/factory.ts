import memoryModelsRepo from '@learninglocker/xapi-state/dist/memoryModelsRepo';
import mongoModelsRepo from '@learninglocker/xapi-state/dist/mongoModelsRepo';
import Repo from '@learninglocker/xapi-state/dist/repoFactory/ModelsRepo';
import FactoryConfig from './FactoryConfig';

export default (factoryConfig: FactoryConfig): Repo => {
  switch (factoryConfig.factoryName) {
    case 'mongo':
      return mongoModelsRepo(factoryConfig.mongo);
    default: case 'memory':
      return memoryModelsRepo(factoryConfig.memory);
  }
};
