import Member from 'jscommons/dist/utils/Member';
import ClientModel from '../../../models/ClientModel';
import StoredStatementModel from '../../../models/StoredStatementModel';

export interface Opts {
  id: string;
  voided?: boolean;
  client: ClientModel;
}

type Signature = Member<Opts, StoredStatementModel>;

export default Signature;
