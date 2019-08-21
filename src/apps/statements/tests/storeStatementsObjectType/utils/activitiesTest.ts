import createContext from '../../utils/createContext';
import StatementTypeAsserter from './StatementTypeAsserter';

const TEST_ACTIVITY = { id: 'http://www.example.com' };

export default (assertTypedStatement: StatementTypeAsserter) => {
  const assertTypedContext = (objCreator: (data: any) => any) => {
    return assertTypedStatement(TEST_ACTIVITY, 'Activity', (data) => {
      return createContext(objCreator([data]));
    });
  };

  it('should generate an objectType in object', async () => {
    await assertTypedStatement(TEST_ACTIVITY, 'Activity', (object) => {
      return { object };
    });
  });

  it('should generate an objectType in parent', async () => {
    await assertTypedContext((parent) => {
      return { parent };
    });
  });

  it('should generate an objectType in grouping', async () => {
    await assertTypedContext((grouping) => {
      return { grouping };
    });
  });

  it('should generate an objectType in category', async () => {
    await assertTypedContext((category) => {
      return { category };
    });
  });

  it('should generate an objectType in other', async () => {
    await assertTypedContext((other) => {
      return { other };
    });
  });
};
