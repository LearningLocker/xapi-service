import Member from 'jscommons/dist/utils/Member';
import ClientModel from '../../../models/ClientModel';
import UpRef from '../../../models/UpRef';

export interface Opts {
  readonly targetIds: string[];
  readonly client: ClientModel;
}

type Signature = Member<Opts, UpRef[]>;

export default Signature;
