import agentFormatTest from './agentFormatTest';

export default (
  createActorStatement: (actor: any) => any,
  createIdsActorStatement: (actor: any) => any = createActorStatement,
) => {
  describe('identified group', () => {
    agentFormatTest((ifi: any): any => {
      return {
        objectType: 'Group',
        ...ifi,
      };
    })(createActorStatement, createIdsActorStatement);
  });

  describe('identified group members', () => {
    agentFormatTest((ifi: any): any => {
      return {
        ...ifi,
        objectType: 'Group',
      };
    }, (ifi: any): any => {
      return {
        ...ifi,
        objectType: 'Group',
        member: [{
          objectType: 'Agent',
          mbox: 'mailto:test@example.com',
        }],
      };
    })(createActorStatement, createIdsActorStatement);
  });

  describe('anonymous group members', () => {
    agentFormatTest((ifi: any): any => {
      return {
        objectType: 'Group',
        member: [ifi],
      };
    }, (ifi: any): any => {
      return {
        objectType: 'Group',
        member: [{
          objectType: 'Agent',
          ...ifi,
        }],
      };
    })(createActorStatement, createIdsActorStatement);
  });
};
