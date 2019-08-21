import Member from 'jscommons/dist/utils/Member';
import ClientModel from '../../../models/ClientModel';

export interface Opts {
  readonly id: string;
  readonly client: ClientModel;
  readonly agents: string[];
  readonly relatedAgents: string[];
  readonly verbs: string[];
  readonly activities: string[];
  readonly relatedActivities: string[];
  readonly registrations: string[];
}

type Signature = Member<Opts, void>;

export default Signature;
