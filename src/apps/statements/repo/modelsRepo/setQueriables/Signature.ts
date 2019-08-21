import Member from 'jscommons/dist/utils/Member';
import ClientModel from '../../../models/ClientModel';

export interface Opts {
  id: string;
  client: ClientModel;
  agents: string[];
  relatedAgents: string[];
  verbs: string[];
  activities: string[];
  relatedActivities: string[];
  registrations: string[];
}

type Signature = Member<Opts, void>;

export default Signature;
