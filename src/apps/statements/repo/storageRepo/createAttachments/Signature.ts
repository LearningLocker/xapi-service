import Member from 'jscommons/dist/utils/Member';
import AttachmentModel from '../../../models/AttachmentModel';

export interface Opts {
  readonly models: AttachmentModel[];
  readonly lrs_id: string;
}

type Signature = Member<Opts, void>;

export default Signature;
