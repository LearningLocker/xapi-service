import Facade from './Facade';
import FactoryConfig from './FactoryConfig';
import memoryFactory from './utils/memoryModels/factory';
import mongoFactory from './utils/mongoModels/factory';

export default (config: FactoryConfig): Facade => {
  switch (config.facade) {
    case 'mongo':
      return mongoFactory(config.mongo);
    default: case 'memory':
      return memoryFactory(config.memory);
  }
};
