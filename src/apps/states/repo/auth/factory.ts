import mongoAuthRepo from '../../mongoAuthRepo';
import Repo from '../../repoFactory/AuthRepo';
import testAuthRepo from '../../testAuthRepo';
import FactoryConfig from './FactoryConfig';

export default (factoryConfig: FactoryConfig): Repo => {
  switch (factoryConfig.factoryName) {
    case 'test':
      return testAuthRepo(factoryConfig.test);
    default: case 'mongo':
      return mongoAuthRepo(factoryConfig.mongo);
  }
};
