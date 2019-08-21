import createSubStatement from '../../utils/createSubStatement';
import assertFilteredStatementRefs from '../utils/assertFilteredStatementRefs';
import assertFilteredStatements from '../utils/assertFilteredStatements';
import agentTest from './utils/agentTest';

const createActor = (instructor: any) => {
  return createSubStatement({ context: { instructor } });
};

describe('get statements by agent in sub statement instructor', () => {
  agentTest(assertFilteredStatements)(createActor, true);
});

describe('get statements by agent in sub statement instructor with references', () => {
  agentTest(assertFilteredStatementRefs)(createActor, true);
});
