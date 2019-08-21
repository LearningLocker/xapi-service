import actorsTest from './utils/actorsTest';
import setupSubStatementTypeTest from './utils/setupSubStatementTypeTest';

describe('store statement with objectType in sub actors', () => {
  const assertTypedStatement = setupSubStatementTypeTest();
  actorsTest(assertTypedStatement);
});
