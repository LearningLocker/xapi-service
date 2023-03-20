import RedisFactoryConfig from './utils/redisEvents/FactoryConfig';
import SQSFactoryConfig from './utils/sqsEvents/FactoryConfig';

export default interface FactoryConfig {
  readonly facade?: string;
  readonly redis?: RedisFactoryConfig;
  readonly sqs?: SQSFactoryConfig;
}
