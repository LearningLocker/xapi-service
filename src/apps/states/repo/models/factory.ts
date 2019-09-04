import memoryModelsRepo from '../../memoryModelsRepo';
import mongoModelsRepo from '../../mongoModelsRepo';
import Repo from '../../repoFactory/ModelsRepo';
import FactoryConfig from './FactoryConfig';

export default (factoryConfig: FactoryConfig): Repo => {
  switch (factoryConfig.factoryName) {
    case 'mongo':
      return mongoModelsRepo(factoryConfig.mongo);
    default: case 'memory':
      return memoryModelsRepo(factoryConfig.memory);
  }
};
