import Member from 'jscommons/dist/utils/Member';
import ClientModel from '../../../models/ClientModel';
import FilterAgent from '../../../models/FilterAgent';
import StoredStatementModel from '../../../models/StoredStatementModel';

export interface Opts {
  agent?: FilterAgent;
  activity?: string;
  verb?: string;
  related_agents?: boolean;
  related_activities?: boolean;
  registration?: string;
  since?: string;
  until?: string;
  ascending: boolean;
  limit: number;
  skip?: number;
  client: ClientModel;
  cursor?: string;
}

type Signature = Member<Opts, StoredStatementModel[]>;

export default Signature;
