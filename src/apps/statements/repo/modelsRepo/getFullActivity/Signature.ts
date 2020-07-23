import Member from 'jscommons/dist/utils/Member';
import ClientModel from '../../../models/ClientModel';
import ContextActivities from '../../../models/ContextActivities';
import Extensions from '../../../models/Extensions';
import LanguageMap from '../../../models/LanguageMap';

export interface Opts {
  readonly activityId: string;
  readonly client: ClientModel;
}

export interface Result {
  readonly id: string;
  readonly name: LanguageMap;
  readonly description: LanguageMap;
  readonly extensions: Extensions;
  readonly type?: string;
  readonly moreInfo?: string;
  readonly contextActivities?: ContextActivities;
}

type Signature = Member<Opts, Result>;

export default Signature;
