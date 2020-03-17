import Facade from './Facade';
import FactoryConfig from './FactoryConfig';
import mongoFactory from './utils/mongoModels/factory';

export default (config: FactoryConfig): Facade => {
  switch (config.facade) {
    default: case 'mongo':
      return mongoFactory(config.mongo);
  }
};
