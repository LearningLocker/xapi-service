import { Db } from 'mongodb';

export default interface FactoryConfig {
  readonly factoryName: string;
  readonly test: {};
  readonly mongo: {
    readonly db: () => Promise<Db>;
  };
}
