import assert from 'assert';
import { delay } from 'bluebird';
import { isArray } from 'lodash';
import createClientModel from '../utils/createClientModel';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID_1 = '1c86d8e9-f325-404f-b3d9-24c451035581';
const TEST_ID_2 = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_ID_3 = '1c86d8e9-f325-404f-b3d9-24c451035583';
const TEST_ID_4 = '1c86d8e9-f325-404f-b3d9-24c451035584';

const TEST_CLIENT = createClientModel();

describe('get statements with cursors', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const statement1 = createStatement({ id: TEST_ID_1 });
  const statement2 = createStatement({ id: TEST_ID_2 });
  const statement3 = createStatement({ id: TEST_ID_3 });
  const statement4 = createStatement({ id: TEST_ID_4 });

  beforeEach(
    async () => {
      await storeStatements([statement1, statement2]);
      await Promise.resolve(delay(100));
      await storeStatements([statement3, statement4]);
    },
  );

  it('should return correct statements when ascending cursor is used', async () => {
    const page1Results = await service.getStatements({
      limit: 2,
      client: TEST_CLIENT,
      ascending: true,
    });

    const actualPage1StatementIdsOrder = page1Results.statements.map((s) => s.id);
    const expectedPage1StatementIdsOrder = [
      TEST_ID_1,
      TEST_ID_2,
    ];

    assert.notEqual(page1Results.cursor, undefined);
    assert(isArray(page1Results.statements), 'Expected an array of statements');
    assert.deepEqual(actualPage1StatementIdsOrder, expectedPage1StatementIdsOrder);

    const page2Results = await service.getStatements({
      limit: 2,
      client: TEST_CLIENT,
      cursor: page1Results.cursor,
      ascending: true,
    });

    const actualPage2StatementIdsOrder = page2Results.statements.map((s) => s.id);
    const expectedPage2StatementIdsOrder = [
      TEST_ID_3,
      TEST_ID_4,
    ];

    assert.equal(page2Results.cursor, undefined);
    assert(isArray(page2Results.statements), 'Expected an array of statements');
    assert.deepEqual(actualPage2StatementIdsOrder, expectedPage2StatementIdsOrder);
  });

  it('should return correct statements when descending cursor is used', async () => {
    const page1Results = await service.getStatements({
      limit: 2,
      client: TEST_CLIENT,
      ascending: false,
    });
    const page1ActualStatementIdsOrder = page1Results.statements.map((s) => s.id);
    const expectedPage1StatementIdsOrder = [
      TEST_ID_4,
      TEST_ID_3,
    ];
    assert.notEqual(page1Results.cursor, undefined);
    assert(isArray(page1Results.statements), 'Expected an array of statements');
    assert.deepEqual(page1ActualStatementIdsOrder, expectedPage1StatementIdsOrder);

    const page2Results = await service.getStatements({
      limit: 2,
      client: TEST_CLIENT,
      ascending: false,
      cursor: page1Results.cursor,
    });
    const page2ActualStatementIdsOrder = page2Results.statements.map((s) => s.id);
    const page2ExpectedStatementIdsOrder = [
      TEST_ID_2,
      TEST_ID_1,
    ];

    assert.equal(page2Results.cursor, undefined);
    assert(isArray(page2Results.statements), 'Expected an array of statements');
    assert.deepEqual(page2ActualStatementIdsOrder, page2ExpectedStatementIdsOrder);
  });
});
