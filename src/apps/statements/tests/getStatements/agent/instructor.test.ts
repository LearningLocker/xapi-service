import assertFilteredStatementRefs from '../utils/assertFilteredStatementRefs';
import assertFilteredStatements from '../utils/assertFilteredStatements';
import agentTest from './utils/agentTest';

const createActor = (instructor: any) => {
  return { context: { instructor } };
};

describe('get statements by agent in instructor', () => {
  agentTest(assertFilteredStatements)(createActor, true);
});

describe('get statements by agent in instructor with references', () => {
  agentTest(assertFilteredStatementRefs)(createActor, true);
});
