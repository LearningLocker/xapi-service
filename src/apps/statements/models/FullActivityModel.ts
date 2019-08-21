import Extensions from './Extensions';
import LanguageMap from './LanguageMap';

interface FullActivityModel {
  readonly activityId: string;
  readonly name: LanguageMap;
  readonly description: LanguageMap;
  readonly moreInfo?: string;
  readonly type?: string;
  readonly extensions: Extensions;
  readonly organisationId: string;
  readonly lrsId: string;
}

export default FullActivityModel;
