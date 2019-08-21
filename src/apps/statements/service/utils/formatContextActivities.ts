import Activity from '../../models/Activity';
import ContextActivities from '../../models/ContextActivities';
import FormattedContextActivities from '../../models/FormattedContextActivities';

export default <ActivityFormat>(
  contextActivities: ContextActivities,
  formatter: (activity: Activity) => ActivityFormat,
): FormattedContextActivities<ActivityFormat> => {
  return {
    ...(
      contextActivities.parent === undefined ? {} :
      { parent: contextActivities.parent.map(formatter) }
    ),
    ...(
      contextActivities.grouping === undefined ? {} :
      { grouping: contextActivities.grouping.map(formatter) }
    ),
    ...(
      contextActivities.category === undefined ? {} :
      { category: contextActivities.category.map(formatter) }
    ),
    ...(
      contextActivities.other === undefined ? {} :
      { other: contextActivities.other.map(formatter) }
    ),
  };
};
