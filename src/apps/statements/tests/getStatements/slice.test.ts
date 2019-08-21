import assert from 'assert';
import { isArray } from 'lodash';
import GetStatementsOptions from '../../serviceFactory/options/GetStatementsOptions';
import createClientModel from '../utils/createClientModel';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID_1 = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_ID_2 = '1c86d8e9-f325-404f-b3d9-24c451035583';
const TEST_ID_3 = '1c86d8e9-f325-404f-b3d9-24c451035584';
const TEST_STATEMENT_1 = createStatement({ id: TEST_ID_1 });
const TEST_STATEMENT_2 = createStatement({ id: TEST_ID_2 });
const TEST_STATEMENT_3 = createStatement({ id: TEST_ID_3 });
const TEST_CLIENT = createClientModel();

describe('get statements by slicing', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const getStatements = async (opts: GetStatementsOptions) => {
    return (await service.getStatements(opts)).statements;
  };

  const sliceStatements = async (opts: GetStatementsOptions) => {
    await storeStatements([TEST_STATEMENT_1, TEST_STATEMENT_2, TEST_STATEMENT_3]);
    const slicedStatements = await getStatements(opts);
    assert(isArray(slicedStatements));
    return slicedStatements;
  };

  it('should return statements when they are inside the limit', async () => {
    const statements = await sliceStatements({
      limit: 1,
      client: TEST_CLIENT,
    });
    assert.equal(statements.length, 1);
    assert.equal(statements[0].id, TEST_ID_3);
  });

  it('should return statements when they are inside the default limit', async () => {
    const statements = await sliceStatements({
      limit: 0,
      client: TEST_CLIENT,
    });
    assert.equal(statements.length, 3);
  });

  it('should return statements when they are not skipped', async () => {
    const statements = await sliceStatements({
      skip: 2,
      client: TEST_CLIENT,
    });
    assert.equal(statements.length, 1);
    assert.equal(statements[0].id, TEST_ID_1);
  });

  it('should return statements when they are not sliced', async () => {
    const statements = await sliceStatements({
      skip: 1,
      limit: 1,
      client: TEST_CLIENT,
    });
    assert.equal(statements.length, 1);
    assert.equal(statements[0].id, TEST_ID_2);
  });
});
