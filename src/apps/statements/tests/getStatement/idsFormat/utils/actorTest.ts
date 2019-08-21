import agentTest from './agentTest';
import groupTest from './groupTest';

export default (
  createActorStatement: (actor: any) => any,
  createIdsActorStatement: (actor: any) => any = createActorStatement,
) => {
  agentTest(createActorStatement, createIdsActorStatement);
  groupTest(createActorStatement, createIdsActorStatement);
};
