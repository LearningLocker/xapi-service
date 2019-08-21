import Member from 'jscommons/dist/utils/Member';
import ClientModel from '../../../models/ClientModel';
import Statement from '../../../models/Statement';

export interface Opts {
  ids: string[];
  client: ClientModel;
}

type Signature = Member<Opts, Statement[]>;

export default Signature;
