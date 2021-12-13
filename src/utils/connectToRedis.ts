import fs from 'fs';
import Ioredis from 'ioredis';
import { once } from 'lodash';
import config from '../config';
import logger from '../logger';

export default once((): (() => Promise<Ioredis.Redis>) => {
  return once(async () => {
    logger.info('Creating redis connection');

    if (config.redis.tlsIsEnabled) {
      return new Ioredis({
        db: config.redis.db,
        password: config.redis.password,
        host: config.redis.host,
        port: config.redis.port,
        tls: {
          cert: fs.readFileSync('./certificates/redis/redis.crt'),
          key: fs.readFileSync('./certificates/redis/redis.key'),
          ca: fs.readFileSync('./certificates/redis/ca.crt'),
        },
      });
    }

    return new Ioredis(config.redis.url);
  });
});
