import activitiesTest from './utils/activitiesTest';
import setupObjectTypeTest from './utils/setupObjectTypeTest';

describe('store statement with objectType in activities', () => {
  const assertTypedStatement = setupObjectTypeTest();
  activitiesTest(assertTypedStatement);
});
