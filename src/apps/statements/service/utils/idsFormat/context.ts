import Context from '../../../models/Context';
import IdFormattedContext from '../../../models/IdFormattedContext';
import formatContextActivities from '../formatContextActivities';
import formatActivity from './activity';
import formatActor from './actor';

export default (context: Context): IdFormattedContext => {
  return {
    ...context,
    ...(
      context.instructor === undefined ? {} :
      { instructor: formatActor(context.instructor) }
    ),
    ...(
      context.team === undefined ? {} :
      { team: formatActor(context.team) }
    ),
    ...(
      context.contextActivities === undefined ? {} :
      {
        contextActivities: formatContextActivities(context.contextActivities, formatActivity),
      }
    ),
  };
};
