import Extensions from './Extensions';
import FormattedContextActivities from './FormattedContextActivities';
import IdFormattedActivity from './IdFormattedActivity';
import IdFormattedActor from './IdFormattedActor';

interface Context {
  readonly contextActivities?: FormattedContextActivities<IdFormattedActivity>;
  readonly team?: IdFormattedActor;
  readonly instructor?: IdFormattedActor;
  readonly registration?: string;
  readonly extensions?: Extensions;
}

export default Context;
