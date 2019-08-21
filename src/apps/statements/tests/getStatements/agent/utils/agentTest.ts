import FilteredStatementsAsserter from '../../utils/FilteredStatementsAsserter';
import agentFilterTest from './agentFilterTest';

export default (assertFilteredStatements: FilteredStatementsAsserter) => {
  return (createActor: (actor: any) => any, relatedAgents: boolean) => {
    describe('agent', () => {
      agentFilterTest(assertFilteredStatements)((actor: any) => {
        return createActor({
          ...actor,
          objectType: 'Agent',
        });
      }, relatedAgents);
    });
  };
};
