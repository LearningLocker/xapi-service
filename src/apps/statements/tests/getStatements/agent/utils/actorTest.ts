import FilteredStatementsAsserter from '../../utils/FilteredStatementsAsserter';
import agentTest from './agentTest';
import groupTest from './groupTest';

export default (assertFilteredStatements: FilteredStatementsAsserter) => {
  return (createActor: (actor: any) => any, relatedAgents = false) => {
    agentTest(assertFilteredStatements)(createActor, relatedAgents);
    groupTest(assertFilteredStatements)(createActor, relatedAgents);
  };
};
