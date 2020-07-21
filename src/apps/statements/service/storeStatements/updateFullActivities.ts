import { flatMap, groupBy, map, last } from 'lodash';
import ClientModel from '../../models/ClientModel';
import StatementBase from '../../models/StatementBase';
import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import Config from '../Config';
import FullActivityModel from "../../models/FullActivityModel";
import Activity from "../../models/Activity";
import ContextActivities from "../../models/ContextActivities";

const convertToFullActivities = (
  activities: Activity[],
  client: ClientModel,
  contextActivities: ContextActivities
): FullActivityModel[] =>
  map(activities, (activity: Activity) => ({
    activityId: activity.id,
    lrsId: client.lrs_id,
    organisationId: client.organisation,
    name: {},
    description: {},
    extensions: {},
    ...activity.definition,
    contextActivities,
  }));

const getContextActivities = (statement: StatementBase, client: ClientModel) => {
  if (statement.context?.contextActivities !== undefined) {
    const contextActivities = statement.context.contextActivities;

    return [
      ...(contextActivities.category === undefined ? [] : convertToFullActivities(contextActivities.category, client, {})),
      ...(contextActivities.grouping === undefined ? [] : convertToFullActivities(contextActivities.grouping, client, {})),
      ...(contextActivities.other === undefined ? [] : convertToFullActivities(contextActivities.other, client, {})),
      ...(contextActivities.parent === undefined ? [] : convertToFullActivities(contextActivities.parent, client, {})),
    ];
  }

  return [];
};

const getObjectActivity = (statement: StatementBase, client: ClientModel) =>
  statement.object.objectType === 'Activity'
    ? convertToFullActivities([statement.object], client, statement.context?.contextActivities ?? {})
    : [];

const getStatementActivities = (statement: StatementBase, client: ClientModel) => [
  ...getObjectActivity(statement, client),
  ...getContextActivities(statement, client),
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
    ...getStatementActivities(model.statement, client),
    ...(
      model.statement.object.objectType === 'SubStatement'
        ? getStatementActivities(model.statement.object, client)
        : []
    ),
  ]);

  // Filters out activities that don't contain used keys in the definition.
  const definedActivities = activities.filter((activity) =>
      activity.contextActivities !== undefined ||
      activity.name !== undefined ||
      activity.description !== undefined ||
      activity.extensions !== undefined ||
      activity.moreInfo !== undefined ||
      activity.type !== undefined
    );

  // Merges the activity definitions to reduce the number of updates.
  const groupedActivities = groupBy(
    definedActivities,
    (activity) => activity.activityId
  );

  const fullActivities = map(groupedActivities, (matchingActivities, activityId): FullActivityModel => {
    const names = matchingActivities.map((matchingActivity) => matchingActivity.name);
    const descriptions = matchingActivities.map((matchingActivity) => matchingActivity.description);
    const extensions = matchingActivities.map((matchingActivity) => matchingActivity.extensions);

    const contextActivities = last(
      matchingActivities
      .map((matchingActivity) => matchingActivity.contextActivities)
      .filter((value) => value !== undefined)
    );

    const type = last(
      matchingActivities
      .map((matchingActivity) => matchingActivity.type)
      .filter((value) => value !== undefined)
    );

    const moreInfo = last(
      matchingActivities
      .map((matchingActivity) => matchingActivity.moreInfo)
      .filter((value) => value !== undefined)
    );

    return {
      activityId,
      lrsId: client.lrs_id,
      organisationId: client.organisation,
      name: Object.assign({}, ...names),
      description: Object.assign({}, ...descriptions),
      extensions: Object.assign({}, ...extensions),
      ...(contextActivities !== undefined ? { contextActivities } : {}),
      ...(type !== undefined ? { type } : {}),
      ...(moreInfo !== undefined ? { moreInfo } : {}),
    };
  });

  await config.repo.updateFullActivities({ fullActivities });
  // tslint:disable-next-line:max-file-line-count
};
