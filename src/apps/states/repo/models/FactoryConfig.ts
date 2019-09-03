import { Db } from 'mongodb';
import State from '../../models/State';

export default interface FactoryConfig {
  readonly factoryName: string;
  readonly mongo: {
    readonly db: () => Promise<Db>;
  };
  readonly memory: {
    readonly state: {
      // tslint:disable-next-line:readonly-keyword
      states: State[];
    };
  };
}
