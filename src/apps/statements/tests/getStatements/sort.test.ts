import assert from 'assert';
import { isArray } from 'lodash';
import GetStatementsOptions from '../../serviceFactory/options/GetStatementsOptions';
import createClientModel from '../utils/createClientModel';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID_1 = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_ID_2 = '1c86d8e9-f325-404f-b3d9-24c451035583';
const TEST_CLIENT = createClientModel();

describe('get statements by sorting', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const getStatements = async (opts: GetStatementsOptions) => {
    return (await service.getStatements(opts)).statements;
  };

  const sortStatements = async (opts: GetStatementsOptions) => {
    await storeStatements([createStatement({ id: TEST_ID_1 })]);
    await new Promise((resolve) => setTimeout(resolve, 1));
    await storeStatements([createStatement({ id: TEST_ID_2 })]);
    const sortedStatements = await getStatements(opts);
    assert(isArray(sortedStatements));
    assert.equal(sortedStatements.length, 2);
    return sortedStatements;
  };

  it('should return statements in the correct order when ascending', async () => {
    const statements = await sortStatements({
      ascending: true,
      client: TEST_CLIENT,
    });
    assert.equal(statements[0].id, TEST_ID_1);
    assert.equal(statements[1].id, TEST_ID_2);
  });

  it('should return statements in the correct order when ascending', async () => {
    const statements = await sortStatements({
      ascending: false,
      client: TEST_CLIENT,
    });
    assert.equal(statements[1].id, TEST_ID_1);
    assert.equal(statements[0].id, TEST_ID_2);
  });
});
