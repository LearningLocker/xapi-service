import assertFilteredStatementRefs from './utils/assertFilteredStatementRefs';
import assertFilteredStatements from './utils/assertFilteredStatements';
import registrationTest from './utils/registrationTest';

describe('get statements by registration', () => {
  registrationTest(assertFilteredStatements);
});

describe('get statements by registration with statement references', () => {
  registrationTest(assertFilteredStatementRefs);
});
