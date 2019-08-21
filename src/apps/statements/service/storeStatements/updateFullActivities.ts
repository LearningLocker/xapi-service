import { flatMap, groupBy, map } from 'lodash';
import ClientModel from '../../models/ClientModel';
import StatementBase from '../../models/StatementBase';
import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import Config from '../Config';

const getContextActivities = (statement: StatementBase) => {
  if (
    statement.context !== undefined &&
    statement.context.contextActivities !== undefined
  ) {
    const contextActivities = statement.context.contextActivities;
    return [
      ...(contextActivities.category === undefined ? [] : contextActivities.category),
      ...(contextActivities.grouping === undefined ? [] : contextActivities.grouping),
      ...(contextActivities.other === undefined ? [] : contextActivities.other),
      ...(contextActivities.parent === undefined ? [] : contextActivities.parent),
    ];
  }
  return [];
};

const getObjectActivity = (statement: StatementBase) => {
  if (statement.object.objectType === 'Activity') {
    return [statement.object];
  }
  return [];
};

const getStatementActivities = (statement: StatementBase) => {
  return [
    ...getObjectActivity(statement),
    ...getContextActivities(statement),
  ];
};

export interface Opts {
  readonly config: Config;
  readonly models: UnstoredStatementModel[];
  readonly client: ClientModel;
}

export default async ({ config, models, client }: Opts): Promise<void> => {
  if (!config.enableActivityUpdates) { return; }

  // Gets the activities from the statements.
  const activities = flatMap(models, (model) => {
    return [
      ...getStatementActivities(model.statement),
      ...(
        model.statement.object.objectType === 'SubStatement' ?
          getStatementActivities(model.statement.object) :
          []
      ),
    ];
  });

  // Filters out activities that don't contain used keys in the definition.
  const definedActivities = activities.filter((activity) => {
    return activity.definition !== undefined && (
      activity.definition.name !== undefined ||
      activity.definition.description !== undefined ||
      activity.definition.extensions !== undefined ||
      activity.definition.moreInfo !== undefined ||
      activity.definition.type !== undefined
    );
  });

  // Merges the activity definitions to reduce the number of updates.
  const groupedActivities = groupBy(definedActivities, (activity) => {
    return activity.id;
  });
  const updates = map(groupedActivities, (matchingActivities, activityId) => {
    const names = matchingActivities.map((matchingActivity) => {
      return (
        matchingActivity.definition !== undefined &&
        matchingActivity.definition.name !== undefined
      ) ? matchingActivity.definition.name : {};
    });
    const descriptions = matchingActivities.map((matchingActivity) => {
      return (
        matchingActivity.definition !== undefined &&
        matchingActivity.definition.description !== undefined
      ) ? matchingActivity.definition.description : {};
    });
    const extensions = matchingActivities.map((matchingActivity) => {
      return (
        matchingActivity.definition !== undefined &&
        matchingActivity.definition.extensions !== undefined
      ) ? matchingActivity.definition.extensions : {};
    });
    const types = matchingActivities.map((matchingActivity) => {
      return (
        matchingActivity.definition !== undefined &&
        matchingActivity.definition.type !== undefined
      ) ? matchingActivity.definition.type : undefined;
    }).filter((value) => {
      return value !== undefined;
    });
    const moreInfos = matchingActivities.map((matchingActivity) => {
      return (
        matchingActivity.definition !== undefined &&
        matchingActivity.definition.moreInfo !== undefined
      ) ? matchingActivity.definition.moreInfo : undefined;
    }).filter((value) => {
      return value !== undefined;
    });

    return {
      activityId,
      name: Object.assign({}, ...names),
      description: Object.assign({}, ...descriptions),
      extensions: Object.assign({}, ...extensions),
      ...(types.length > 0 ? { type: types[types.length - 1] } : {}),
      ...(moreInfos.length > 0 ? { moreInfo: moreInfos[moreInfos.length - 1] } : {}),
    };
  });

  await config.repo.updateFullActivities({ updates, client });
  // tslint:disable-next-line:max-file-line-count
};
