import activityTest from './utils/activityTest';
import assertFilteredStatementRefs from './utils/assertFilteredStatementRefs';
import assertFilteredStatements from './utils/assertFilteredStatements';

describe('get statements by activity', () => {
  activityTest(assertFilteredStatements);
});

describe('get statements by activity with statement references', () => {
  activityTest(assertFilteredStatementRefs);
});
