import Facade from './Facade';
import FactoryConfig from './FactoryConfig';
import fakeFactory from './utils/fakeEvents/factory';
import redisFactory from './utils/redisEvents/factory';
import sentinelFactory from './utils/sentinel/factory';

export default (config: FactoryConfig): Facade => {
  switch (config.facade) {
    case 'test':
      return fakeFactory();
    case 'sentinel':
      return sentinelFactory(config.sentinel);
    default: case 'redis':
      return redisFactory(config.redis);
  }
};
