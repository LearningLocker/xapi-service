import { delay } from 'bluebird';
import { ObjectID } from 'mongodb';
import StoredStatementModel from '../../models/StoredStatementModel';
import connectToMongoDb from '../../repo/utils/connectToMongoDb';
import createClientModel from '../utils/createClientModel';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import { assertStatementsPageResultsAndOrder } from './utils/assertStatementsPageResultsAndOrder';

const TEST_ID_1 = '46bca0ac-426f-44ec-8b7d-04eb31dd1f22';
const TEST_ID_2 = '92718e8a-8eaf-4f20-b347-0a82cdedacf0';
const TEST_ID_3 = '4a39fc67-eab0-4b2e-a8fd-5785d7600160';
const TEST_ID_4 = 'cf3b2ddd-ae7d-4f48-b653-02a385f64067';
const TEST_ID_5 = '3418987e-fc23-497f-9e3c-cb00d2783255';

const TEST_CLIENT = createClientModel();

describe('get statements with cursors', () => {
  const service = setup();

  const statement1: Partial<StoredStatementModel> = {
    _id: new ObjectID('5bae31b42e18c3081e40db5a') as any as string,
    person: null,
    active: true,
    voided: false,
    client: new ObjectID(TEST_CLIENT._id) as any as string,
    lrs_id: new ObjectID(TEST_CLIENT.lrs_id) as any as string,
    organisation: new ObjectID(TEST_CLIENT.organisation) as any as string,
    stored: new Date('2018-09-28T13:50:44.041Z'),
    statement: createStatement({
      id: TEST_ID_1,
      stored: '2018-09-28T13:50:44.041Z',
    }),
  };
  const statement2: Partial<StoredStatementModel> = {
    _id: new ObjectID('5bae3248e07a8007f0b27deb') as any as string,
    person: null,
    active: true,
    voided: false,
    client: new ObjectID(TEST_CLIENT._id) as any as string,
    lrs_id: new ObjectID(TEST_CLIENT.lrs_id) as any as string,
    organisation: new ObjectID(TEST_CLIENT.organisation) as any as string,
    stored: new Date('2018-09-28T13:53:12.874Z'),
    statement: createStatement({
      id: TEST_ID_2,
      stored: '2018-09-28T13:53:12.874Z',
    }),
  };
  const statement3: Partial<StoredStatementModel> = {
    _id: new ObjectID('5bae32485e331207f3d8e005') as any as string,
    person: null,
    active: true,
    voided: false,
    client: new ObjectID(TEST_CLIENT._id) as any as string,
    lrs_id: new ObjectID(TEST_CLIENT.lrs_id) as any as string,
    organisation: new ObjectID(TEST_CLIENT.organisation) as any as string,
    stored: new Date('2018-09-28T13:53:12.882Z'),
    statement: createStatement({
      id: TEST_ID_3,
      stored: '2018-09-28T13:53:12.882Z',
    }),
  };
  const statement4: Partial<StoredStatementModel> = {
    _id: new ObjectID('5bae324821a3b907e9b13992') as any as string,
    person: null,
    active: true,
    voided: false,
    client: new ObjectID(TEST_CLIENT._id) as any as string,
    lrs_id: new ObjectID(TEST_CLIENT.lrs_id) as any as string,
    organisation: new ObjectID(TEST_CLIENT.organisation) as any as string,
    stored: new Date('2018-09-28T13:53:12.943Z'),
    statement: createStatement({
      id: TEST_ID_4,
      stored: '2018-09-28T13:53:12.943Z',
    }),
  };
  const statement5: Partial<StoredStatementModel> = {
    _id: new ObjectID('5bae32482e18c3081e40db63') as any as string,
    person: null,
    active: true,
    voided: false,
    client: new ObjectID(TEST_CLIENT._id) as any as string,
    lrs_id: new ObjectID(TEST_CLIENT.lrs_id) as any as string,
    organisation: new ObjectID(TEST_CLIENT.organisation) as any as string,
    stored: new Date('2018-09-28T13:53:12.994Z'),
    statement: createStatement({
      id: TEST_ID_5,
      stored: '2018-09-28T13:53:12.994Z',
    }),
  };

  it('should return correct statements when ascending cursor is used', async () => {
    const db = await connectToMongoDb()();
    await db
      .collection('statements')
      .insertMany([
        statement1,
        statement2,
        statement3,
        statement4,
        statement5,
      ]);

    const page1Results = await assertStatementsPageResultsAndOrder({
      service,
      client: TEST_CLIENT,
      ascending: true,
      expectedPageStatementIds: [
        TEST_ID_1,
        TEST_ID_2,
      ],
      pageNumber: 1,
    });

    const page2Results = await assertStatementsPageResultsAndOrder({
      service,
      client: TEST_CLIENT,
      ascending: true,
      cursor: page1Results.cursor,
      expectedPageStatementIds: [
        TEST_ID_3,
        TEST_ID_4,
      ],
      pageNumber: 2,
    });

    await assertStatementsPageResultsAndOrder({
      service,
      client: TEST_CLIENT,
      ascending: true,
      cursor: page2Results.cursor,
      expectedPageStatementIds: [
        TEST_ID_5,
      ],
      isNextPageCheckEnabled: false,
      pageNumber: 3,
    });
  });

  it('should return correct statements when descending cursor is used', async () => {
    const db = await connectToMongoDb()();
    await db
      .collection('statements')
      .insertMany([
        statement1,
        statement2,
        statement3,
        statement4,
        statement5,
      ]);

    const page1Results = await assertStatementsPageResultsAndOrder({
      service,
      client: TEST_CLIENT,
      expectedPageStatementIds: [
        TEST_ID_5,
        TEST_ID_4,
      ],
      pageNumber: 1,
    });

    const page2Results = await assertStatementsPageResultsAndOrder({
      service,
      client: TEST_CLIENT,
      cursor: page1Results.cursor,
      expectedPageStatementIds: [
        TEST_ID_3,
        TEST_ID_2,
      ],
      pageNumber: 2,
    });

    await assertStatementsPageResultsAndOrder({
      service,
      client: TEST_CLIENT,
      cursor: page2Results.cursor,
      expectedPageStatementIds: [
        TEST_ID_1,
      ],
      isNextPageCheckEnabled: false,
      pageNumber: 3,
    });
  });
// tslint:disable-next-line:max-file-line-count
});
