import assert from 'assert';
import createClientModel from '../utils/createClientModel';
import createContext from '../utils/createContext';
import createStatement from '../utils/createStatement';
import createSubStatement from '../utils/createSubStatement';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_ACTIVITY = {
  objectType: 'Activity',
  id: 'http://www.example.com',
};

describe('store statement with context', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const assertContext = (context: any, expectedContextActivities: any) => {
    if (context !== undefined && context.contextActivities !== undefined) {
      assert.deepEqual(context.contextActivities, expectedContextActivities);
    } else {
      /* istanbul ignore next */
      assert(false, 'Expected context activities to be defined');
    }
  };

  const getStatement = async () => {
    const client = createClientModel();
    const result = await service.getStatement({
      id: TEST_ID,
      voided: false,
      client,
    });
    const statement = result.statements[0];
    return statement;
  };

  const testWrappedContext = async (key: string) => {
    const expectedContextActivities = { [key]: [TEST_ACTIVITY] };
    await storeStatements([createStatement({
      id: TEST_ID,
      ...createContext({
        [key]: TEST_ACTIVITY,
      }),
    })]);
    const statement = await getStatement();
    assertContext(statement.context, expectedContextActivities);
  };

  const testWrappedSubContext = async (key: string) => {
    const expectedContextActivities = { [key]: [TEST_ACTIVITY] };
    await storeStatements([createStatement({
      id: TEST_ID,
      ...createSubStatement(createContext({
        [key]: TEST_ACTIVITY,
      })),
    })]);
    const statement = await getStatement();
    if (statement.object.objectType === 'SubStatement') {
      assertContext(statement.object.context, expectedContextActivities);
    } else {
      /* istanbul ignore next */
      assert(false, 'Expected sub statement');
    }
  };

  it('should wrap a statement\'s parent in an array when given an object', async () => {
    await testWrappedContext('parent');
  });

  it('should wrap a statement\'s grouping in an array when given an object', async () => {
    await testWrappedContext('grouping');
  });

  it('should wrap a statement\'s category in an array when given an object', async () => {
    await testWrappedContext('category');
  });

  it('should wrap a statement\'s other in an array when given an object', async () => {
    await testWrappedContext('other');
  });

  it('should wrap a sub statement\'s parent in an array when given an object', async () => {
    await testWrappedSubContext('parent');
  });

  it('should wrap a sub statement\'s grouping in an array when given an object', async () => {
    await testWrappedSubContext('grouping');
  });

  it('should wrap a sub statement\'s category in an array when given an object', async () => {
    await testWrappedSubContext('category');
  });

  it('should wrap a sub statement\'s other in an array when given an object', async () => {
    await testWrappedSubContext('other');
  });
});
