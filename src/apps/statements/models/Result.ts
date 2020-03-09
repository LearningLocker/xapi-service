import Extensions from './Extensions';
import Score from './Score';

interface Result {
  readonly score?: Score;
  readonly success?: boolean;
  readonly completion?: boolean;
  readonly response?: string;
  readonly duration?: string;
  readonly extensions?: Extensions;
}

export default Result;
