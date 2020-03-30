import createClientModel from '../utils/createClientModel';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';
import { assertStatementsPageResultsAndOrder } from './utils/assertStatementsPageResultsAndOrder';

const TEST_ID_1 = '46bca0ac-426f-44ec-8b7d-04eb31dd1f22';
const TEST_ID_2 = '92718e8a-8eaf-4f20-b347-0a82cdedacf0';
const TEST_ID_3 = '4a39fc67-eab0-4b2e-a8fd-5785d7600160';
const TEST_ID_4 = 'cf3b2ddd-ae7d-4f48-b653-02a385f64067';
const TEST_ID_5 = '3418987e-fc23-497f-9e3c-cb00d2783255';

const TEST_CLIENT = createClientModel();

describe('get statements with the same stored value using cursor', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const statement1 = createStatement({ id: TEST_ID_1 });
  const statement2 = createStatement({ id: TEST_ID_2 });
  const statement3 = createStatement({ id: TEST_ID_3 });
  const statement4 = createStatement({ id: TEST_ID_4 });
  const statement5 = createStatement({ id: TEST_ID_5 });

  it('should return correct statements when ascending', async () => {
    await storeStatements([statement1, statement2, statement3, statement4, statement5]);

    const page1Results = await assertStatementsPageResultsAndOrder({
      service,
      client: TEST_CLIENT,
      ascending: true,
      expectedPageStatementIds: [TEST_ID_1, TEST_ID_2],
      pageNumber: 1,
    });

    const page2Results = await assertStatementsPageResultsAndOrder({
      service,
      client: TEST_CLIENT,
      ascending: true,
      cursor: page1Results.cursor,
      expectedPageStatementIds: [TEST_ID_3, TEST_ID_4],
      pageNumber: 2,
    });

    await assertStatementsPageResultsAndOrder({
      service,
      client: TEST_CLIENT,
      ascending: true,
      cursor: page2Results.cursor,
      expectedPageStatementIds: [TEST_ID_5],
      isNextPageCheckEnabled: false,
      pageNumber: 3,
    });
  });

  it('should return correct statements when descending cursor', async () => {
    await storeStatements([statement1, statement2, statement3, statement4, statement5]);

    const page1Results = await assertStatementsPageResultsAndOrder({
      service,
      client: TEST_CLIENT,
      expectedPageStatementIds: [TEST_ID_5, TEST_ID_4],
      pageNumber: 1,
    });

    const page2Results = await assertStatementsPageResultsAndOrder({
      service,
      client: TEST_CLIENT,
      cursor: page1Results.cursor,
      expectedPageStatementIds: [TEST_ID_3, TEST_ID_2],
      pageNumber: 2,
    });

    await assertStatementsPageResultsAndOrder({
      service,
      client: TEST_CLIENT,
      cursor: page2Results.cursor,
      expectedPageStatementIds: [TEST_ID_1],
      isNextPageCheckEnabled: false,
      pageNumber: 3,
    });
  });
});
