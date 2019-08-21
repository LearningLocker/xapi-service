import assert from 'assert';
import btoa from 'btoa';
import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { ObjectID } from 'mongodb';
import ExpiredClientError from '../../../errors/ExpiredClientError';
import UntrustedClientError from '../../../errors/UntrustedClientError';
import createClientModel from '../../../tests/utils/createClientModel';
import connectToMongoDb from '../../utils/connectToMongoDb';
import mongoFactory from '../utils/mongoAuth/factory';

const TEST_CLIENT_MODEL = createClientModel({
  _id: '5988f0f00000000000000123',
});
const TEST_BASIC_KEY = '123';
const TEST_BASIC_SECRET = 'abc';
const TEST_BASIC_TOKEN = `Basic ${btoa(`${TEST_BASIC_KEY}:${TEST_BASIC_SECRET}`)}`;
const TEST_ACCESS_TOKEN = '11112222-3333-4444-5555-666677778888';
const TEST_CLIENT = {
  ...TEST_CLIENT_MODEL,
  _id: new ObjectID('5988f0f00000000000000123'),
  api: {
    basic_key: TEST_BASIC_KEY,
    basic_secret: TEST_BASIC_SECRET,
  },
  authority: JSON.stringify(TEST_CLIENT_MODEL),
  organisation: new ObjectID('5988f0f00000000000000000'),
  lrs_id: new ObjectID('5988f0f00000000000000001'),
};
const TEST_ORG = {
  _id: new ObjectID('5988f0f00000000000000000'),
  createdAt: new Date('2017-10-25T14:39:44.962Z'),
  updatedAt: new Date('2017-10-25T14:39:58.376Z'),
  name: 'Test Org',
};
const TEST_STORE = {
  _id: new ObjectID('5988f0f00000000000000001'),
  organisation: new ObjectID('5988f0f00000000000000000'),
  createdAt: new Date('2017-10-25T14:39:44.962Z'),
  updatedAt: new Date('2017-10-25T14:39:58.376Z'),
  title: 'Test LRS',
  description: 'Test LRS Description',
  statementCount: 0,
};
const TEST_OAUTH_TOKEN = {
  _id: new ObjectID('5988f0f00000000000000002'),
  clientId: new ObjectID('5988f0f00000000000000123'),
  accessToken: TEST_ACCESS_TOKEN,
  createdAt: new Date('2017-10-25T14:39:44.962Z'),
  expireAt: new Date('2017-10-25T15:39:44.962Z'),
};

describe(__filename, () => {
  const connection = connectToMongoDb();
  const authRepo = mongoFactory({ db: connection });

  beforeEach(async () => {
    const db = await connection();
    await db.dropDatabase();
  });

  it('should return a client from the db when basic auth token is valid', async () => {
    const db = await connection();
    await db.collection('organisations').insertOne(TEST_ORG);
    await db.collection('lrs').insertOne(TEST_STORE);
    await db.collection('client').insertOne(TEST_CLIENT);
    const result = await authRepo.getClient({ authToken: TEST_BASIC_TOKEN });
    assert.equal(result.client._id, TEST_CLIENT_MODEL._id);
  });

  it('should error when getting without any clients in the DB', async () => {
    const promise = authRepo.getClient({ authToken: TEST_BASIC_TOKEN });
    await assertError(NoModel, promise);
  });

  it('should error when getting a untrusted client', async () => {
    const db = await connection();
    await db.collection('client').insertOne({
      ...TEST_CLIENT,
      isTrusted: false,
    });
    const promise = authRepo.getClient({ authToken: TEST_BASIC_TOKEN });
    await assertError(UntrustedClientError, promise);
  });

  it('should error when getting a client with a missing store', async () => {
    const db = await connection();
    await db.collection('organisations').insertOne(TEST_ORG);
    await db.collection('client').insertOne(TEST_CLIENT);
    const promise = authRepo.getClient({ authToken: TEST_BASIC_TOKEN });
    await assertError(NoModel, promise);
  });

  it('should error when getting a client with a missing org', async () => {
    const db = await connection();
    await db.collection('lrs').insertOne(TEST_STORE);
    await db.collection('client').insertOne(TEST_CLIENT);
    const promise = authRepo.getClient({ authToken: TEST_BASIC_TOKEN });
    await assertError(NoModel, promise);
  });

  it('should error when getting a client with an expired org', async () => {
    const db = await connection();
    await db.collection('organisations').insertOne({
      ...TEST_ORG,
      expiration: new Date(),
    });
    await db.collection('lrs').insertOne(TEST_STORE);
    await db.collection('client').insertOne(TEST_CLIENT);
    const promise = authRepo.getClient({ authToken: TEST_BASIC_TOKEN });
    await assertError(ExpiredClientError, promise);
  });

  it('should not error when getting a client with an renewed org', async () => {
    const db = await connection();
    await db.collection('organisations').insertOne({
      ...TEST_ORG,
      expiration: null,
    });
    await db.collection('lrs').insertOne(TEST_STORE);
    await db.collection('client').insertOne(TEST_CLIENT);
    await authRepo.getClient({ authToken: TEST_BASIC_TOKEN });
  });

  it('should return a client from the db when access_token is valid', async () => {
    const db = await connection();
    await db.collection('organisations').insertOne({
      ...TEST_ORG,
      expiration: null,
    });
    await db.collection('lrs').insertOne(TEST_STORE);
    await db.collection('client').insertOne(TEST_CLIENT);
    await db.collection('oAuthTokens').insertOne(TEST_OAUTH_TOKEN);
    const result = await authRepo.getClient({ authToken: `Bearer ${TEST_ACCESS_TOKEN}` });
    assert.equal(result.client._id, TEST_CLIENT._id);
  });

  it('should error when access_token is not found in collection', async () => {
    const db = await connection();
    await db.collection('organisations').insertOne({
      ...TEST_ORG,
      expiration: null,
    });
    await db.collection('lrs').insertOne(TEST_STORE);
    await db.collection('client').insertOne(TEST_CLIENT);
    const promise = authRepo.getClient({ authToken: `Bearer ${TEST_ACCESS_TOKEN}` });
    await assertError(NoModel, promise);
  });

  it('should error when authToken starts from an invalid string', async () => {
    const db = await connection();
    await db.collection('organisations').insertOne({
      ...TEST_ORG,
      expiration: null,
    });
    await db.collection('lrs').insertOne(TEST_STORE);
    await db.collection('client').insertOne(TEST_CLIENT);
    await db.collection('oAuthTokens').insertOne(TEST_OAUTH_TOKEN);
    const promise = authRepo.getClient({ authToken: `Test ${TEST_ACCESS_TOKEN}` });
    await assertError(NoModel, promise);
  });
  // tslint:disable-next-line:max-file-line-count
});
