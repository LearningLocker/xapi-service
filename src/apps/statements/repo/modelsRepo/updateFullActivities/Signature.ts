import Member from 'jscommons/dist/utils/Member';
import FullActivityModel from '../../../models/FullActivityModel';

export interface Opts {
  readonly fullActivities: FullActivityModel[];
}

type Signature = Member<Opts, void>;

export default Signature;
