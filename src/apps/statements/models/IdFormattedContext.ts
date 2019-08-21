import Extensions from './Extensions';
import FormattedContextActivities from './FormattedContextActivities';
import IdFormattedActivity from './IdFormattedActivity';
import IdFormattedActor from './IdFormattedActor';

interface Context {
  contextActivities?: FormattedContextActivities<IdFormattedActivity>;
  team?: IdFormattedActor;
  instructor?: IdFormattedActor;
  registration?: string;
  extensions?: Extensions;
}

export default Context;
