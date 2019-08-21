import FilteredStatementsAsserter from '../../utils/FilteredStatementsAsserter';
import agentFilterTest from './agentFilterTest';

export default (assertFilteredStatements: FilteredStatementsAsserter) => {
  return (createActor: (actor: any) => any, relatedAgents: boolean) => {
    describe('identified group', () => {
      agentFilterTest(assertFilteredStatements)((actor: any) => {
        return createActor({
          ...actor,
          objectType: 'Group',
        });
      }, relatedAgents);
    });

    describe('identified group members', () => {
      agentFilterTest(assertFilteredStatements)((actor: any) => {
        return createActor({
          mbox: 'mailto:test@example.com',
          objectType: 'Group',
          member: [{
            ...actor,
            objectType: 'Agent',
          }],
        });
      }, relatedAgents);
    });

    describe('anonymous group members', () => {
      agentFilterTest(assertFilteredStatements)((actor: any) => {
        return createActor({
          objectType: 'Group',
          member: [{
            ...actor,
            objectType: 'Group',
          }],
        });
      }, relatedAgents);
    });
  };
};
