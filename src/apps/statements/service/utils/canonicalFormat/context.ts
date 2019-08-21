import Activity from '../../../models/Activity';
import Context from '../../../models/Context';
import formatContextActivities from '../formatContextActivities';
import formatActivity from './activity';

const formatContextActivity = (langs: string[]) => {
  return (activity: Activity): Activity => {
    return formatActivity(activity, langs);
  };
};

export default (context: Context, langs: string[]): Context => {
  return {
    ...context,
    ...(
      context.contextActivities === undefined ? {} :
      {
        contextActivities: formatContextActivities(
          context.contextActivities,
          formatContextActivity(langs),
        ),
      }
    ),
  };
};
