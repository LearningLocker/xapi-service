import Facade from './Facade';
import FactoryConfig from './FactoryConfig';
import redisFactory from './utils/redisEvents/factory';

export default (config: FactoryConfig): Facade => {
  switch (config.facade) {
    default:
    case 'redis':
      return redisFactory(config.redis);
  }
};
