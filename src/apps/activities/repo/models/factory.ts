import mongoModelsRepo from '../../mongoModelsRepo';
import Repo from '../../repoFactory/ModelsRepo';
import FactoryConfig from './FactoryConfig';

export default (factoryConfig: FactoryConfig): Repo => {
  switch (factoryConfig.factoryName) {
    default: case 'mongo':
      return mongoModelsRepo(factoryConfig.mongo);
  }
};
