import memoryModelsRepo from '@learninglocker/xapi-agents/dist/memoryModelsRepo';
import mongoModelsRepo from '@learninglocker/xapi-agents/dist/mongoModelsRepo';
import Repo from '@learninglocker/xapi-agents/dist/repoFactory/ModelsRepo';
import FactoryConfig from './FactoryConfig';

export default (factoryConfig: FactoryConfig): Repo => {
  switch (factoryConfig.factoryName) {
    case 'mongo':
      return mongoModelsRepo(factoryConfig.mongo);
    default: case 'memory':
      return memoryModelsRepo(factoryConfig.memory);
  }
};
