import Member from 'jscommons/dist/utils/Member';
import ClientModel from '../../../models/ClientModel';
import StoredStatementModel from '../../../models/StoredStatementModel';

export interface Opts {
  readonly id: string;
  readonly voided?: boolean;
  readonly client: ClientModel;
}

type Signature = Member<Opts, StoredStatementModel>;

export default Signature;
