import { Db } from 'mongodb';

export default interface FactoryConfig {
  readonly factoryName: string;
  readonly test: Record<string, never>;
  readonly mongo: {
    readonly db: () => Promise<Db>;
  };
}
