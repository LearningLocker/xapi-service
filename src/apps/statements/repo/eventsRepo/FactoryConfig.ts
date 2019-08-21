import RedisFactoryConfig from './utils/redisEvents/FactoryConfig';

export default interface FactoryConfig {
  readonly facade?: string;
  readonly redis?: RedisFactoryConfig;
  readonly sentinel?: RedisFactoryConfig;
}
