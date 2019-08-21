import Member from 'jscommons/dist/utils/Member';
import ClientModel from '../../../models/ClientModel';
import FilterAgent from '../../../models/FilterAgent';
import StoredStatementModel from '../../../models/StoredStatementModel';

export interface Opts {
  readonly agent?: FilterAgent;
  readonly activity?: string;
  readonly verb?: string;
  readonly related_agents?: boolean;
  readonly related_activities?: boolean;
  readonly registration?: string;
  readonly since?: string;
  readonly until?: string;
  readonly ascending: boolean;
  readonly limit: number;
  readonly skip?: number;
  readonly client: ClientModel;
  readonly cursor?: string;
}

type Signature = Member<Opts, StoredStatementModel[]>;

export default Signature;
