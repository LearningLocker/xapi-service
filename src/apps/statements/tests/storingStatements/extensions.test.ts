import assert from 'assert';
import createClientModel from '../utils/createClientModel';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ACTIVITY_ID = 'http://www.example.org/activity';
const TEST_EXTENSION_KEY = 'http://www.example.org/extension';
const TEST_EXTENSION_VALUE = 'example';
const TEST_EXTENSIONS = {
  [TEST_EXTENSION_KEY]: {
    [TEST_EXTENSION_KEY]: TEST_EXTENSION_VALUE,
  },
};
const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_CLIENT = createClientModel();
const TEST_ACTIVITY = {
  objectType: 'Activity',
  id: TEST_ACTIVITY_ID,
  definition: {
    extensions: TEST_EXTENSIONS,
  },
};

describe('store statement extensions', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const getStatement = async () => {
    const result = await service.getStatement({ id: TEST_ID, voided: false, client: TEST_CLIENT });
    return result.statements[0];
  };

  it('should store statements with extensions', async () => {
    const statementWithExtensions = createStatement({
      id: TEST_ID,
      object: TEST_ACTIVITY,
      context: {
        extensions: TEST_EXTENSIONS,
        contextActivities: {
          category: [TEST_ACTIVITY],
          grouping: [TEST_ACTIVITY],
          parent: [TEST_ACTIVITY],
          other: [TEST_ACTIVITY],
        },
      },
      result: {
        extensions: TEST_EXTENSIONS,
      },
    });
    await storeStatements([statementWithExtensions]);
    const actualStatement = await getStatement();
    const expectedStatement = {
      ...actualStatement,
      ...statementWithExtensions,
    };
    assert.deepEqual(actualStatement, expectedStatement);
  });

  it('should store statements with extensions in sub statements', async () => {
    const statementWithExtensions = createStatement({
      id: TEST_ID,
      object: {
        ...createStatement({}),
        objectType: 'SubStatement',
        object: TEST_ACTIVITY,
        context: {
          extensions: TEST_EXTENSIONS,
          contextActivities: {
            category: [TEST_ACTIVITY],
            grouping: [TEST_ACTIVITY],
            parent: [TEST_ACTIVITY],
            other: [TEST_ACTIVITY],
          },
        },
        result: {
          extensions: TEST_EXTENSIONS,
        },
      },
    });
    await storeStatements([statementWithExtensions]);
    const actualStatement = await getStatement();
    const expectedStatement = {
      ...actualStatement,
      ...statementWithExtensions,
    };
    assert.deepEqual(actualStatement, expectedStatement);
  });
});
