import assert from 'assert';
import { delay } from 'bluebird';
import { isArray } from 'lodash';
import GetStatementsOptions from '../../serviceFactory/options/GetStatementsOptions';
import createClientModel from '../utils/createClientModel';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID_1 = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_ID_2 = '1c86d8e9-f325-404f-b3d9-24c451035583';
const TEST_ID_3 = '1c86d8e9-f325-404f-b3d9-24c451035584';
const TEST_ID_4 = '1c86d8e9-f325-404f-b3d9-24c451035585';
const TEST_ID_5 = '1c86d8e9-f325-404f-b3d9-24c451035586';
const TEST_ID_6 = '1c86d8e9-f325-404f-b3d9-24c451035587';

const TEST_CLIENT = createClientModel();

describe('get statements by sorting', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const getStatements = async (opts: GetStatementsOptions) => {
    return (await service.getStatements(opts)).statements;
  };

  const sortStatements = async (opts: GetStatementsOptions) => {
    await storeStatements(
      [
        createStatement({ id: TEST_ID_1 }),
        createStatement({ id: TEST_ID_2 }),
        createStatement({ id: TEST_ID_3 }),
        createStatement({ id: TEST_ID_4 }),
      ],
    );
    await Promise.resolve(delay(100));
    await storeStatements(
      [
        createStatement({ id: TEST_ID_5 }),
        createStatement({ id: TEST_ID_6 }),
      ],
    );
    const sortedStatements = await getStatements(opts);

    assert(isArray(sortedStatements));
    assert.equal(sortedStatements.length, 6);

    return sortedStatements;
  };

  it('should return statements in the correct order when ascending', async () => {
    const statements = await sortStatements({
      ascending: true,
      client: TEST_CLIENT,
    });

    const actualStatementsOrder = statements.map((s) => s.id);
    const expectedStatementsOrder = [
      TEST_ID_1,
      TEST_ID_2,
      TEST_ID_3,
      TEST_ID_4,
      TEST_ID_5,
      TEST_ID_6,
    ];

    assert.deepEqual(actualStatementsOrder, expectedStatementsOrder);
  });

  it('should return statements in the correct order when ascending', async () => {
    const statements = await sortStatements({
      ascending: false,
      client: TEST_CLIENT,
    });

    const actualStatementsOrder = statements.map((s) => s.id);
    const expectedStatementsOrder = [
      TEST_ID_6,
      TEST_ID_5,
      TEST_ID_4,
      TEST_ID_3,
      TEST_ID_2,
      TEST_ID_1,
    ];

    assert.deepEqual(actualStatementsOrder, expectedStatementsOrder);
  });
});
