import assertFilteredStatements from '../utils/assertFilteredStatements';
import agentFilterTest from './utils/agentFilterTest';
import agentTest from './utils/agentTest';

describe('get statements by agent in authority', () => {
  agentTest(assertFilteredStatements)((authority: any) => {
    return { authority };
  }, true);

  describe('anonymous group members', () => {
    agentFilterTest(assertFilteredStatements)((actor: any) => {
      return {
        authority: {
          objectType: 'Group',
          member: [{
            ...actor,
            objectType: 'Agent',
          }, {
            mbox: 'mailto:test@example.com',
            objectType: 'Agent',
          }],
        },
      };
    }, true);
  });
});
