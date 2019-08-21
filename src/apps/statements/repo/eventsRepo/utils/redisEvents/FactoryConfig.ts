import { Redis } from 'ioredis';

export default interface FactoryConfig {
  readonly client?: () => Promise<Redis>;
  readonly prefix?: string;
}
