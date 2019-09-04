import { Db } from 'mongodb';
import ActivityProfile from '../../models/Profile';

export default interface FactoryConfig {
  readonly factoryName: string;
  readonly mongo: {
    readonly db: () => Promise<Db>;
  };
  readonly memory: {
    readonly state: {
      // tslint:disable-next-line:readonly-keyword
      activityProfiles: ActivityProfile[];
    };
  };
}
