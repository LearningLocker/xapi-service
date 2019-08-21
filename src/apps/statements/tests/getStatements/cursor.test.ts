import assert from 'assert';
import { delay } from 'bluebird';
import { isArray } from 'lodash';
import createClientModel from '../utils/createClientModel';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID_A = '1c86d8e9-f325-404f-b3d9-24c45103558A';
const TEST_ID_B = '1c86d8e9-f325-404f-b3d9-24c45103558B';
const TEST_CLIENT = createClientModel();

describe('get statements with cursors', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  it('should return correct statements when ascending cursor is used', async () => {
    const statement1 = createStatement({ id: TEST_ID_A });
    const statement2 = createStatement({ id: TEST_ID_B });
    await storeStatements([statement1]);
    await Promise.resolve(delay(10));
    await storeStatements([statement2]);
    const result1 = await service.getStatements({
      limit: 1,
      client: TEST_CLIENT,
      ascending: true,
    });
    assert.notEqual(result1.cursor, undefined);
    assert(isArray(result1.statements), 'Expected an array of statements');
    assert.deepEqual(result1.statements.map((statement) => {
      return statement.id;
    }), [TEST_ID_A]);
    const result2 = await service.getStatements({
      limit: 1,
      client: TEST_CLIENT,
      cursor: result1.cursor,
      ascending: true,
    });
    assert.equal(result2.cursor, undefined);
    assert(isArray(result2.statements), 'Expected an array of statements');
    assert.deepEqual(result2.statements.map((statement) => {
      return statement.id;
    }), [TEST_ID_B]);
  });

  it('should return correct statements when descending cursor is used', async () => {
    const statement1 = createStatement({ id: TEST_ID_A });
    const statement2 = createStatement({ id: TEST_ID_B });
    await storeStatements([statement1]);
    await Promise.resolve(delay(10));
    await storeStatements([statement2]);
    const result1 = await service.getStatements({
      limit: 1,
      client: TEST_CLIENT,
      ascending: false,
    });
    assert.notEqual(result1.cursor, undefined);
    assert(isArray(result1.statements), 'Expected an array of statements');
    assert.deepEqual(result1.statements.map((statement) => {
      return statement.id;
    }), [TEST_ID_B]);
    const result2 = await service.getStatements({
      limit: 1,
      client: TEST_CLIENT,
      ascending: false,
      cursor: result1.cursor,
    });
    assert.equal(result2.cursor, undefined);
    assert(isArray(result2.statements), 'Expected an array of statements');
    assert.deepEqual(result2.statements.map((statement) => {
      return statement.id;
    }), [TEST_ID_A]);
  });
});
