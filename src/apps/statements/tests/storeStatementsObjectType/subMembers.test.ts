import membersTest from './utils/membersTest';
import setupSubStatementTypeTest from './utils/setupSubStatementTypeTest';

describe('store statement with objectType in sub members', () => {
  const assertTypedStatement = setupSubStatementTypeTest();
  membersTest(assertTypedStatement);
});
