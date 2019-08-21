import Ioredis from 'ioredis';
import { defaultTo, once } from 'lodash';
import config from '../config';
import logger from '../logger';

export default once((): () => Promise<Ioredis.Redis> => {
  return once(async () => {
    logger.info('Creating sentinel connection');
    return new Ioredis({
      db: defaultTo(config.sentinel.db, 0),
      name: defaultTo(config.sentinel.name, 'mymaster'),
      password: config.sentinel.password,
      sentinels: defaultTo(config.sentinel.sentinels, [{ host: '127.0.0.1', port: 6379 }]),
    });
  });
});
