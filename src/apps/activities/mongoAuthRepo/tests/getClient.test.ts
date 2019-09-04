// tslint:disable:max-file-line-count
import * as assert from 'assert';
import btoa from 'btoa';
import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { ObjectID } from 'mongodb';
import connectToMongoDb from '../../../../utils/connectToMongoDb';
import ExpiredClientError from '../../errors/ExpiredClientError';
import UntrustedClientError from '../../errors/UntrustedClientError';
import mongoFactory from '../index';

const TEST_BASIC_KEY = '123';
const TEST_BASIC_SECRET = 'abc';
const TEST_TOKEN = `Basic ${btoa(`${TEST_BASIC_KEY}:${TEST_BASIC_SECRET}`)}`;
const TEST_ACCESS_TOKEN = '11112222-3333-4444-5555-666677778888';
const TEST_CLIENT = {
  _id: new ObjectID('5988f0f00000000000000123'),
  api: {
    basic_key: TEST_BASIC_KEY,
    basic_secret: TEST_BASIC_SECRET,
  },
  authority: JSON.stringify({
    mbox: 'mailto:authority@example.com',
    objectType: 'Agent',
  }),
  lrs_id: new ObjectID('5988f0f00000000000000001'),
  organisation: new ObjectID('5988f0f00000000000000000'),
};
const TEST_ORG = {
  _id: new ObjectID('5988f0f00000000000000000'),
  createdAt: new Date('2017-10-25T14:39:44.962Z'),
  name: 'Test Org',
  updatedAt: new Date('2017-10-25T14:39:58.376Z'),
};
const TEST_STORE = {
  _id: new ObjectID('5988f0f00000000000000001'),
  createdAt: new Date('2017-10-25T14:39:44.962Z'),
  description: 'Test LRS Description',
  organisation: new ObjectID('5988f0f00000000000000000'),
  statementCount: 0,
  title: 'Test LRS',
  updatedAt: new Date('2017-10-25T14:39:58.376Z'),
};
const TEST_OAUTH_TOKEN = {
  _id: new ObjectID('5988f0f00000000000000002'),
  clientId: new ObjectID('5988f0f00000000000000123'),
  accessToken: TEST_ACCESS_TOKEN,
  createdAt: new Date('2017-10-25T14:39:44.962Z'),
  expireAt: new Date('2017-10-25T15:39:44.962Z'),
};

describe('getClient from mongo client', () => {
  const connection = connectToMongoDb();
  const authRepo = mongoFactory({ db: connection });

  beforeEach(async () => {
    const db = await connection();
    await db.dropDatabase();
  });

  it('should return a client from the db', async () => {
    const db = await connection();
    await db.collection('organisations').insertOne(TEST_ORG);
    await db.collection('lrs').insertOne(TEST_STORE);
    await db.collection('client').insertOne(TEST_CLIENT);
    const result = await authRepo.getClient({ authToken: TEST_TOKEN });
    assert.equal(result.client._id, TEST_CLIENT._id);
  });

  it('should error when getting a untrusted client', async () => {
    const db = await connection();
    await db.collection('client').insertOne({
      ...TEST_CLIENT,
      isTrusted: false,
    });
    const promise = authRepo.getClient({ authToken: TEST_TOKEN });
    await assertError(UntrustedClientError, promise);
  });

  it('should error when getting without any clients in the DB', async () => {
    const promise = authRepo.getClient({ authToken: TEST_TOKEN });
    await assertError(NoModel, promise);
  });

  it('should error when getting a client with a missing store', async () => {
    const db = await connection();
    await db.collection('organisations').insertOne(TEST_ORG);
    await db.collection('client').insertOne(TEST_CLIENT);
    const promise = authRepo.getClient({ authToken: TEST_TOKEN });
    await assertError(NoModel, promise);
  });

  it('should error when getting a client with a missing org', async () => {
    const db = await connection();
    await db.collection('lrs').insertOne(TEST_STORE);
    await db.collection('client').insertOne(TEST_CLIENT);
    const promise = authRepo.getClient({ authToken: TEST_TOKEN });
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
    const promise = authRepo.getClient({ authToken: TEST_TOKEN });
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
    await authRepo.getClient({ authToken: TEST_TOKEN });
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
});
