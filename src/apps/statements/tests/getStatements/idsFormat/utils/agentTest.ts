import agentFormatTest from './agentFormatTest';

export default (
  createActorStatement: (actor: any) => any,
  createIdsActorStatement: (actor: any) => any = createActorStatement,
) => {
  describe('agent', () => {
    agentFormatTest((ifi: any): any => {
      return ifi;
    })(createActorStatement, createIdsActorStatement);
  });
};
