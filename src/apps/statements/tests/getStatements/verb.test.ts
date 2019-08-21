import assertFilteredStatementRefs from './utils/assertFilteredStatementRefs';
import assertFilteredStatements from './utils/assertFilteredStatements';
import verbTest from './utils/verbTest';

describe('get statements by verb', () => {
  verbTest(assertFilteredStatements);
});

describe('get statements by verb with statement references', () => {
  verbTest(assertFilteredStatementRefs);
});
