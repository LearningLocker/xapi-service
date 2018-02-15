import mongoAuthRepo from '@learninglocker/xapi-state/dist/mongoAuthRepo';
import Repo from '@learninglocker/xapi-state/dist/repoFactory/AuthRepo';
import testAuthRepo from '@learninglocker/xapi-state/dist/testAuthRepo';
import FactoryConfig from './FactoryConfig';

export default (factoryConfig: FactoryConfig): Repo => {
  switch (factoryConfig.factoryName) {
    case 'test':
      return testAuthRepo(factoryConfig.test);
    default: case 'mongo':
      return mongoAuthRepo(factoryConfig.mongo);
  }
};
