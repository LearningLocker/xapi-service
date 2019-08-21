import Activity from '../../../models/Activity';
import IdFormattedActivity from '../../../models/IdFormattedActivity';

export default (activity: Activity): IdFormattedActivity => {
  return {
    id: activity.id,
  };
};
