import { delay } from 'bluebird';
import { ObjectID } from 'mongodb';
import StoredStatementModel from '../../models/StoredStatementModel';
import connectToMongoDb from '../../repo/utils/connectToMongoDb';
import createClientModel from '../utils/createClientModel';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';
import { assertStatementsPageResultsAndOrder } from './utils/assertStatementsPageResultsAndOrder';

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

  it('should return correct statements when ascending cursor is used', async () => {
    await storeStatements([statement1, statement2]);
    await Promise.resolve(delay(100));
    await storeStatements([statement3, statement4]);

    const page1Results = await assertStatementsPageResultsAndOrder({
      service,
      client: TEST_CLIENT,
      expectedPageStatementIds: [
        TEST_ID_1,
        TEST_ID_2,
      ],
      pageNumber: 1,
    });

    await assertStatementsPageResultsAndOrder({
      service,
      client: TEST_CLIENT,
      cursor: page1Results.cursor,
      expectedPageStatementIds: [
        TEST_ID_3,
        TEST_ID_4,
      ],
      pageNumber: 2,
      isNextPageCheckEnabled: false,
    });
  });

  it('should return correct statements when descending cursor is used', async () => {
    await storeStatements([statement1, statement2]);
    await Promise.resolve(delay(100));
    await storeStatements([statement3, statement4]);

    const page1Results = await assertStatementsPageResultsAndOrder({
      service,
      client: TEST_CLIENT,
      expectedPageStatementIds: [
        TEST_ID_4,
        TEST_ID_3,
      ],
      ascending: false,
      pageNumber: 1,
    });

    await assertStatementsPageResultsAndOrder({
      service,
      client: TEST_CLIENT,
      cursor: page1Results.cursor,
      expectedPageStatementIds: [
        TEST_ID_2,
        TEST_ID_1,
      ],
      ascending: false,
      isNextPageCheckEnabled: false,
      pageNumber: 2,
    });
  });

  it('extra specific cursor problem', async () => {
    const STATEMENT_1_ID = '46bca0ac-426f-44ec-8b7d-04eb31dd1f22';
    const STATEMENT_2_ID = '92718e8a-8eaf-4f20-b347-0a82cdedacf0';
    const STATEMENT_3_ID = '4a39fc67-eab0-4b2e-a8fd-5785d7600160';
    const STATEMENT_4_ID = 'cf3b2ddd-ae7d-4f48-b653-02a385f64067';
    const STATEMENT_5_ID = '3418987e-fc23-497f-9e3c-cb00d2783255';

    const stm1: Partial<StoredStatementModel> = {
      _id: new ObjectID('5bae31b42e18c3081e40db5a') as any as string,
      person: null,
      active: true,
      voided: false,
      client: new ObjectID(TEST_CLIENT._id) as any as string,
      lrs_id: new ObjectID(TEST_CLIENT.lrs_id) as any as string,
      organisation: new ObjectID(TEST_CLIENT.organisation) as any as string,
      stored: new Date('2018-09-28T13:50:44.041Z'),
      statement: createStatement({
        id: STATEMENT_1_ID,
        stored: '2018-09-28T13:50:44.041Z',
      }),
    };
    const stm2: Partial<StoredStatementModel> = {
      _id: new ObjectID('5bae3248e07a8007f0b27deb') as any as string,
      person: null,
      active: true,
      voided: false,
      client: new ObjectID(TEST_CLIENT._id) as any as string,
      lrs_id: new ObjectID(TEST_CLIENT.lrs_id) as any as string,
      organisation: new ObjectID(TEST_CLIENT.organisation) as any as string,
      stored: new Date('2018-09-28T13:53:12.874Z'),
      statement: createStatement({
        id: STATEMENT_2_ID,
        stored: '2018-09-28T13:53:12.874Z',
      }),
    };
    const stm3: Partial<StoredStatementModel> = {
      _id: new ObjectID('5bae32485e331207f3d8e005') as any as string,
      person: null,
      active: true,
      voided: false,
      client: new ObjectID(TEST_CLIENT._id) as any as string,
      lrs_id: new ObjectID(TEST_CLIENT.lrs_id) as any as string,
      organisation: new ObjectID(TEST_CLIENT.organisation) as any as string,
      stored: new Date('2018-09-28T13:53:12.882Z'),
      statement: createStatement({
        id: STATEMENT_3_ID,
        stored: '2018-09-28T13:53:12.882Z',
      }),
    };
    const stm4: Partial<StoredStatementModel> = {
      _id: new ObjectID('5bae324821a3b907e9b13992') as any as string,
      person: null,
      active: true,
      voided: false,
      client: new ObjectID(TEST_CLIENT._id) as any as string,
      lrs_id: new ObjectID(TEST_CLIENT.lrs_id) as any as string,
      organisation: new ObjectID(TEST_CLIENT.organisation) as any as string,
      stored: new Date('2018-09-28T13:53:12.943Z'),
      statement: createStatement({
        id: STATEMENT_4_ID,
        stored: '2018-09-28T13:53:12.943Z',
      }),
    };
    const stm5: Partial<StoredStatementModel> = {
      _id: new ObjectID('5bae32482e18c3081e40db63') as any as string,
      person: null,
      active: true,
      voided: false,
      client: new ObjectID(TEST_CLIENT._id) as any as string,
      lrs_id: new ObjectID(TEST_CLIENT.lrs_id) as any as string,
      organisation: new ObjectID(TEST_CLIENT.organisation) as any as string,
      stored: new Date('2018-09-28T13:53:12.994Z'),
      statement: createStatement({
        id: STATEMENT_5_ID,
        stored: '2018-09-28T13:53:12.994Z',
      }),
    };

    const db = await connectToMongoDb()();
    await db
      .collection('statements')
      .insertMany([
        stm1,
        stm2,
        stm3,
        stm4,
        stm5,
      ]);

    const page1Results = await assertStatementsPageResultsAndOrder({
      service,
      client: TEST_CLIENT,
      expectedPageStatementIds: [
        STATEMENT_1_ID,
        STATEMENT_2_ID,
      ],
      pageNumber: 1,
    });

    const page2Results = await assertStatementsPageResultsAndOrder({
      service,
      client: TEST_CLIENT,
      cursor: page1Results.cursor,
      expectedPageStatementIds: [
        STATEMENT_3_ID,
        STATEMENT_4_ID,
      ],
      pageNumber: 2,
    });

    await assertStatementsPageResultsAndOrder({
      service,
      client: TEST_CLIENT,
      cursor: page2Results.cursor,
      expectedPageStatementIds: [
        STATEMENT_5_ID,
      ],
      isNextPageCheckEnabled: false,
      pageNumber: 3,
    });
  });

// tslint:disable-next-line:max-file-line-count
});
