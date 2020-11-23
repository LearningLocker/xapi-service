import { flatMap, groupBy, isArray, isEmpty, last, map, mapValues, mergeWith, uniq } from 'lodash';
import Activity from '../../models/Activity';
import ClientModel from '../../models/ClientModel';
import ContextActivities from '../../models/ContextActivities';
import FullActivityClient from '../../models/FullActivityClient';
import FullActivityContextActivities from '../../models/FullActivityContextActivities';
import FullActivityDatabase from '../../models/FullActivityDatabase';
import StatementBase from '../../models/StatementBase';
import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import Config from '../Config';

const convertToFullActivities = (
  activities: Activity[],
  client: ClientModel,
  contextActivities: ContextActivities = {},
): FullActivityClient[] =>
  map(activities, (activity) => ({
    activityId: activity.id,
    lrsId: client.lrs_id,
    organisationId: client.organisation,
    name: {},
    description: {},
    extensions: {},
    ...activity.definition,
    ...(isEmpty(contextActivities) ? {} : { context: { contextActivities } }),
  }));

const getContextActivities = (statement: StatementBase, client: ClientModel) => {
  if (statement.context?.contextActivities !== undefined) {
    const contextActivities = statement.context.contextActivities;

    return [
      ...(
        contextActivities.category === undefined
          ? []
          : convertToFullActivities(contextActivities.category, client)
      ),
      ...(
        contextActivities.grouping === undefined
          ? []
          : convertToFullActivities(contextActivities.grouping, client)
      ),
      ...(
        contextActivities.other === undefined
          ? []
          : convertToFullActivities(contextActivities.other, client)
      ),
      ...(
        contextActivities.parent === undefined
          ? []
          : convertToFullActivities(contextActivities.parent, client)
      ),
    ];
  }

  return [];
};

const getObjectActivity = (statement: StatementBase, client: ClientModel) =>
  statement.object.objectType === 'Activity'
    ? convertToFullActivities(
        [statement.object],
        client,
        statement.context?.contextActivities ?? {},
      )
    : [];

const getStatementActivities = (statement: StatementBase, client: ClientModel) => [
  ...getObjectActivity(statement, client),
  ...getContextActivities(statement, client),
];

const getFullActivitiesFromStatements = (
  statements: UnstoredStatementModel[],
  client: ClientModel,
) =>
  flatMap(statements, (statement) => [
    ...getStatementActivities(statement.statement, client),
    ...(
      statement.statement.object.objectType === 'SubStatement'
        ? getStatementActivities(statement.statement.object, client)
        : []
    ),
  ]);

export interface Opts {
  readonly config: Config;
  readonly models: UnstoredStatementModel[];
  readonly client: ClientModel;
}

export default async ({ config, models, client }: Opts): Promise<void> => {
  if (!config.enableActivityUpdates) { return; }

  const clientFullActivities = getFullActivitiesFromStatements(models, client);

  const definedActivities = clientFullActivities.filter((fullActivity) =>
      !isEmpty(fullActivity.context) ||
      !isEmpty(fullActivity.name) ||
      !isEmpty(fullActivity.description) ||
      !isEmpty(fullActivity.extensions) ||
      fullActivity.moreInfo !== undefined ||
      fullActivity.type !== undefined,
  );

  // Merges the activity definitions to reduce the number of updates.
  const groupedActivities = groupBy(
    definedActivities,
    (activity) => activity.activityId,
  );

  const fullActivities = map(
    groupedActivities,
    (matchingActivities, activityId): FullActivityDatabase => {
      const names = matchingActivities.map(
        (matchingActivity) => matchingActivity.name,
      );

      const descriptions = matchingActivities.map(
        (matchingActivity) => matchingActivity.description,
      );

      const extensions = matchingActivities.map(
        (matchingActivity) => matchingActivity.extensions,
      );

      const contextActivitiesForFullActivity: FullActivityContextActivities[] =
        matchingActivities.map((matchingActivity) =>
          mapValues(matchingActivity.context?.contextActivities, (matchingContextActivities) =>
            matchingContextActivities !== undefined
              // tslint:disable-next-line:max-line-length
              ? matchingContextActivities.map((matchingContextActivity) => matchingContextActivity.id)
              : matchingContextActivities,
          ),
        );

      const mergedContextActivities = contextActivitiesForFullActivity.reduce(
        (acc, contextActivity) => {

          return mergeWith(acc, contextActivity, (objValue, srcValue) =>
            isArray(objValue)
              ? uniq(objValue.concat(srcValue))
              : objValue,
          );
        },
      );

      const type = last(
        matchingActivities
        .map((matchingActivity) => matchingActivity.type)
        .filter((value) => value !== undefined),
      );

      const moreInfo = last(
        matchingActivities
        .map((matchingActivity) => matchingActivity.moreInfo)
        .filter((value) => value !== undefined),
      );

      return {
        activityId,
        lrsId: client.lrs_id,
        organisationId: client.organisation,
        name: Object.assign({}, ...names),
        description: Object.assign({}, ...descriptions),
        extensions: Object.assign({}, ...extensions),
        ...(isEmpty(mergedContextActivities)
          ? {}
          : { context: { contextActivities: mergedContextActivities } }),
        ...(type !== undefined ? { type } : {}),
        ...(moreInfo !== undefined ? { moreInfo } : {}),
      };
    },
  );

  await config.repo.updateFullActivities({ fullActivities });
// tslint:disable-next-line:max-file-line-count
};
