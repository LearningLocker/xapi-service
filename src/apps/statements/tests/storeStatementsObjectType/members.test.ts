import membersTest from './utils/membersTest';
import setupObjectTypeTest from './utils/setupObjectTypeTest';

describe('store statement with objectType in members', () => {
  const assertTypedStatement = setupObjectTypeTest();
  membersTest(assertTypedStatement);
});
