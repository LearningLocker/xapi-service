import ContextActivities from './ContextActivities';
import Extensions from './Extensions';
import LanguageMap from './LanguageMap';

interface FullActivityModel {
  readonly activityId: string;
  readonly organisationId: string;
  readonly lrsId: string;
  readonly name?: LanguageMap;
  readonly description?: LanguageMap;
  readonly moreInfo?: string;
  readonly type?: string;
  readonly extensions?: Extensions;
  readonly contextActivities?: ContextActivities;
}

export default FullActivityModel;
