import mongoAuthRepo from '@learninglocker/xapi-activities/dist/mongoAuthRepo';
import Repo from '@learninglocker/xapi-activities/dist/repoFactory/AuthRepo';
import testAuthRepo from '@learninglocker/xapi-activities/dist/testAuthRepo';
import FactoryConfig from './FactoryConfig';

export default (factoryConfig: FactoryConfig): Repo => {
  switch (factoryConfig.factoryName) {
    case 'test':
      return testAuthRepo(factoryConfig.test);
    default: case 'mongo':
      return mongoAuthRepo(factoryConfig.mongo);
  }
};
