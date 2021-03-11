import Facade from './Facade';
import FactoryConfig from './FactoryConfig';
import fakeFactory from './utils/fakeAuth/factory';
import mongoFactory from './utils/mongoAuth/factory';

export default (config: FactoryConfig): Facade => {
  switch (config.facade) {
    case 'test':
      return fakeFactory(config.fake);
    default:
    case 'mongo':
      return mongoFactory(config.mongo);
  }
};
