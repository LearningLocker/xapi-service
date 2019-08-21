import Extensions from './Extensions';
import LanguageMap from './LanguageMap';

interface Definition {
  readonly name?: LanguageMap;
  readonly description?: LanguageMap;
  readonly extensions?: Extensions;
  readonly type?: string;
  readonly moreInfo?: string;
}

export default Definition;
