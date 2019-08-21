import actorsTest from './utils/actorsTest';
import setupObjectTypeTest from './utils/setupObjectTypeTest';

describe('store statement with objectType in actors', () => {
  const assertTypedStatement = setupObjectTypeTest();
  actorsTest(assertTypedStatement);
});
