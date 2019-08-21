import activitiesTest from './utils/activitiesTest';
import setupSubStatementTypeTest from './utils/setupSubStatementTypeTest';

describe('store statement with objectType in sub activities', () => {
  const assertTypedStatement = setupSubStatementTypeTest();
  activitiesTest(assertTypedStatement);
});
