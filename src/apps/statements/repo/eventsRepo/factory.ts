import Facade from './Facade';
import FactoryConfig from './FactoryConfig';
import redisFactory from './utils/redisEvents/factory';
import sqsFactory from './utils/sqsEvents/factory';

export default (config: FactoryConfig): Facade => {
  switch (config.facade) {
    default:
    case 'redis':
      return redisFactory(config.redis);
    case 'sqs':
      return sqsFactory(config.sqs);
  }
};
