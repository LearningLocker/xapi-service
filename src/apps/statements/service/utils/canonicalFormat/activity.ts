import Activity from '../../../models/Activity';
import Definition from '../../../models/Definition';
import formatLangMap from './langMap';

const formatDefinition = (definition: Definition, langs: string[]): Definition => {
  return {
    ...definition,
    ...(
      definition.name === undefined ? {} :
      { name: formatLangMap(definition.name, langs) }
    ),
    ...(
      definition.description === undefined ? {} :
      { description: formatLangMap(definition.description, langs) }
    ),
  };
};

export default (activity: Activity, langs: string[]): Activity => {
  return {
    ...activity,
    ...(
      activity.definition === undefined ? {} :
      { definition: formatDefinition(activity.definition, langs) }
    ),
  };
};
