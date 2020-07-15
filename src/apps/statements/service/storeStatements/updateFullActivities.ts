import { flatMap, groupBy, map } from 'lodash';
import ClientModel from '../../models/ClientModel';
import StatementBase from '../../models/StatementBase';
import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import Config from '../Config';

const getContextActivities = (statement: StatementBase) => {
  if (statement.context?.contextActivities !== undefined) {
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

const getObjectActivity = (statement: StatementBase) =>
  statement.object.objectType === 'Activity'
    ? [statement.object]
    : [];

const getStatementActivities = (statement: StatementBase) => [
  ...getObjectActivity(statement),
  ...getContextActivities(statement),
];

export interface Opts {
  readonly config: Config;
  readonly models: UnstoredStatementModel[];
  readonly client: ClientModel;
}

export default async ({ config, models, client }: Opts): Promise<void> => {
  if (!config.enableActivityUpdates) { return; }

  // Gets the activities from the statements.
  const activities = flatMap(models, (model) => [
    ...getStatementActivities(model.statement),
    ...(
      model.statement.object.objectType === 'SubStatement'
        ? getStatementActivities(model.statement.object)
        : []
    ),
  ]);

  // Filters out activities that don't contain used keys in the definition.
  const definedActivities = activities.filter((activity) =>
    activity.definition !== undefined && (
      activity.definition.name !== undefined ||
      activity.definition.description !== undefined ||
      activity.definition.extensions !== undefined ||
      activity.definition.moreInfo !== undefined ||
      activity.definition.type !== undefined
    ));

  // Merges the activity definitions to reduce the number of updates.
  const groupedActivities = groupBy(
    definedActivities,
    (activity) => activity.id
  );

  const updates = map(groupedActivities, (matchingActivities, activityId) => {
    const names = matchingActivities
      .map((matchingActivity) => matchingActivity.definition?.name);

    const descriptions = matchingActivities
      .map((matchingActivity) => matchingActivity.definition?.description);

    const extensions = matchingActivities
      .map((matchingActivity) => matchingActivity.definition?.extensions);

    const types = matchingActivities
      .map((matchingActivity) => matchingActivity.definition?.type)
      .filter((value) => value !== undefined);

    const moreInfos = matchingActivities
      .map((matchingActivity) => matchingActivity.definition?.moreInfo)
      .filter((value) => value !== undefined);

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
