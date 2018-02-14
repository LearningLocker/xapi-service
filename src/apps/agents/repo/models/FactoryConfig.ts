import AgentProfile from '@learninglocker/xapi-agents/dist/models/Profile';
import { Db } from 'mongodb';

export default interface FactoryConfig {
  readonly factoryName: string;
  readonly mongo: {
    readonly db: () => Promise<Db>;
  };
  readonly memory: {
    readonly state: {
      // tslint:disable-next-line:readonly-keyword
      agentProfiles: AgentProfile[];
    };
  };
}
