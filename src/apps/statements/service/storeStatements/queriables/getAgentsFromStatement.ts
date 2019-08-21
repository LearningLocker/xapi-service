import { get, has, union } from 'lodash';
import Actor from '../../../models/Actor';
import Group from '../../../models/Group';
import Statement from '../../../models/Statement';
import StatementBase from '../../../models/StatementBase';
import StatementObject from '../../../models/StatementObject';
import getActorIdent from '../../../utils/getActorIdent';

export const getActorIdents = (actor: Actor): string[] => {
  try {
    return [getActorIdent(actor)];
  } catch (err) {
    return [];
  }
};

const getGroupMemberIdents = (group: Group): string[] => {
  if (group.member === undefined) {
    return [];
  }

  // tslint:disable-next-line:no-use-before-declare
  return union(...group.member.map(getAgentsFromObject));
};

export const getGroupIdents = (group: Group): string[] => {
  const idents = getActorIdents(group);
  const members = getGroupMemberIdents(group);
  return [...idents, ...members];
};

const getAgentsFromObject = (obj: StatementObject): string[] => {

  switch (obj.objectType) {
    case 'Agent':
      return getActorIdents(obj);
    case 'Group':
      return getGroupIdents(obj);
    default:
      return [];
  }
};

const getAgentsFromTeam = (statement: StatementBase): string[] => {
  const path = ['context', 'team'];
  if (has(statement, path)) {
    const team: Actor = get(statement, path);
    return getAgentsFromObject(team);
  }
  return [];
};

const getAgentsFromInstructor = (statement: StatementBase): string[] => {
  const path = ['context', 'instructor'];
  if (has(statement, path)) {
    const team: Actor = get(statement, path);
    return getAgentsFromObject(team);
  }
  return [];
};

const getRelatedAgentsFromStatementBase = (statement: StatementBase): string[] => {
  return [
    // tslint:disable-next-line:no-use-before-declare
    ...getAgentsFromStatement(statement),
    ...getAgentsFromTeam(statement),
    ...getAgentsFromInstructor(statement),
  ];
};

const getAgentsFromSubStatement = (statement: StatementBase): string[] => {
  if (statement.object.objectType === 'SubStatement') {
    return getRelatedAgentsFromStatementBase(statement.object);
  }

  return [];
};

export const getAgentsFromStatement = (statement: StatementBase): string[] => {
  return union([
    ...getAgentsFromObject(statement.actor),
    ...getAgentsFromObject(statement.object),
  ]);
};

export const getRelatedAgentsFromStatement = (statement: Statement): string[] => {
  return union([
    ...getRelatedAgentsFromStatementBase(statement),
    ...getAgentsFromObject(statement.authority),
    ...getAgentsFromSubStatement(statement),
  ]);
};
