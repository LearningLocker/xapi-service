import { Redis } from 'ioredis';

export default interface FacadeConfig {
  readonly client: () => Promise<Redis>;
  readonly prefix: string;
}
