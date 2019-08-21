import Member from 'jscommons/dist/utils/Member';
import UnstoredStatementModel from '../../../models/UnstoredStatementModel';

export interface Opts {
  readonly models: UnstoredStatementModel[];
}

type Signature = Member<Opts, UnstoredStatementModel[]>;

export default Signature;
