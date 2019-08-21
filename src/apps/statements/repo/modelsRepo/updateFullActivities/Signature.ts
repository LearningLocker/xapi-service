import Member from 'jscommons/dist/utils/Member';
import ClientModel from '../../../models/ClientModel';
import LanguageMap from '../../../models/LanguageMap';

export interface Update {
  readonly activityId: string;
  readonly name: LanguageMap;
  readonly description: LanguageMap;
  readonly extensions: LanguageMap;
  readonly moreInfo?: string;
  readonly type?: string;
}

export interface Opts {
  readonly updates: Update[];
  readonly client: ClientModel;
}

type Signature = Member<Opts, void>;

export default Signature;
