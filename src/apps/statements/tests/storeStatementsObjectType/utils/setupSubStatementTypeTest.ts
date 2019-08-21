import createSubStatement from '../../utils/createSubStatement';
import setupObjectTypeTest from './setupObjectTypeTest';
import StatementTypeAsserter from './StatementTypeAsserter';

export default () => {
  const assertTypedStatement = setupObjectTypeTest();

  const assertTypedSubStatement: StatementTypeAsserter = (obj, objectType, objCreator) => {
    return assertTypedStatement(obj, objectType, (data) => {
      return createSubStatement(objCreator(data));
    });
  };

  return assertTypedSubStatement;
};
