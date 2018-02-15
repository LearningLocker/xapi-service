import mongoAuthRepo from '@learninglocker/xapi-agents/dist/mongoAuthRepo';
import testAuthRepo from '@learninglocker/xapi-agents/dist/testAuthRepo';
import FactoryConfig from './FactoryConfig';

export default (factoryConfig: FactoryConfig) => {
  switch (factoryConfig.factoryName) {
    case 'test':
      return testAuthRepo(factoryConfig.test);
    default: case 'mongo':
      return mongoAuthRepo(factoryConfig.mongo);
  }
};
