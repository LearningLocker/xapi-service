import Ioredis from 'ioredis';
import { once } from 'lodash';
import config from '../../../../config';
import logger from '../../../../logger';

export default once((): () => Promise<Ioredis.Redis> => {
  return once(async () => {
    logger.info('Creating sentinel connection');
    return new Ioredis({
      db: config.sentinel.db,
      name: config.sentinel.name,
      password: config.sentinel.password,
      sentinels: config.sentinel.sentinels,
    });
  });
});
