import Ioredis from 'ioredis';
import { defaultTo, once } from 'lodash';
import config from '../../../../config';
import logger from '../../../../logger';

export default once((): () => Promise<Ioredis.Redis> => {
  return once(async () => {
    logger.info('Creating redis connection');
    return new Ioredis(
      defaultTo(config.redis.url, 'redis://127.0.0.1:6379/0'),
    );
  });
});
