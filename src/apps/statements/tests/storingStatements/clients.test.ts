import assert from 'assert';
import { isArray } from 'lodash';
import createClientModel from '../utils/createClientModel';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';

const LRS2_ID = '5988f0f00000000000000002';

const LRS2_CLIENT = createClientModel({ lrs_id: LRS2_ID });

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_STATEMENT = createStatement({ id: TEST_ID });

describe('store lrs statements with same ids', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  it('should store statements with matching ids across 2 stores', async () => {
    await storeStatements([TEST_STATEMENT]);
    await storeStatements([TEST_STATEMENT], [], LRS2_CLIENT);

    const ids: string[] = await storeStatements([TEST_STATEMENT]);
    assert.equal(isArray(ids), true);
    assert.deepEqual(ids, [TEST_ID]);
  });
});
