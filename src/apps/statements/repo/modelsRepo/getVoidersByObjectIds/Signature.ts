import Member from 'jscommons/dist/utils/Member';
import ClientModel from '../../../models/ClientModel';

export interface Opts {
  readonly ids: string[];
  readonly client: ClientModel;
}

type Signature = Member<Opts, string[]>;

export default Signature;
