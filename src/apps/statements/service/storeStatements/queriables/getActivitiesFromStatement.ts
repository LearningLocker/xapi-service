import { get, has, union } from 'lodash';
import Activity from '../../../models/Activity';
import Statement from '../../../models/Statement';
import StatementBase from '../../../models/StatementBase';
import StatementObject from '../../../models/StatementObject';

const getActivityIdsFromObject = (obj: StatementObject): string[] => {
  if (obj.objectType === 'Activity') {
    return [obj.id];
  }
  return [];
};

const getActivitiesFromContextActivities = (statement: StatementBase, key: string): string[] => {
  const path = ['context', 'contextActivities', key];
  if (has(statement, path)) {
    const activities: Activity[] = get(statement, path);
    return union(...activities.map(getActivityIdsFromObject));
  }

  return [];
};

const getActivitiesFromStatementBase = (statement: StatementBase): string[] => {
  return [
    ...getActivityIdsFromObject(statement.object),
    ...getActivitiesFromContextActivities(statement, 'parent'),
    ...getActivitiesFromContextActivities(statement, 'grouping'),
    ...getActivitiesFromContextActivities(statement, 'category'),
    ...getActivitiesFromContextActivities(statement, 'other'),
  ];
};

const getActivitiesFromSubStatement = (statement: StatementBase): string[] => {
  if (statement.object.objectType === 'SubStatement') {
    return getActivitiesFromStatementBase(statement.object);
  }

  return [];
};

export const getActivitiesFromStatement = (statement: Statement): string[] => {
  return getActivityIdsFromObject(statement.object);
};

export const getRelatedActivitiesFromStatement = (statement: Statement): string[] => {
  return union([
    ...getActivitiesFromStatementBase(statement),
    ...getActivitiesFromSubStatement(statement),
  ]);
};
