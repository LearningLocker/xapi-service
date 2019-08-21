import Member from 'jscommons/dist/utils/Member';
import ClientModel from '../../../models/ClientModel';

export interface Opts {
  readonly authToken: string;
}

export interface Result {
  readonly client: ClientModel;
}

type Signature = Member<Opts, Result>;

export default Signature;
