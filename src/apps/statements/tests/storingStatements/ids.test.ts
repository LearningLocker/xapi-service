import assert from 'assert';
import { isArray } from 'lodash';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';

describe('store statement ids', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  it('should use existing id when they have an id', async () => {
    const ids: string[] = await storeStatements([createStatement({ id: TEST_ID })]);
    assert.equal(isArray(ids), true);
    assert.deepEqual(ids, [TEST_ID]);
  });

  it('should generate an id when they have no id', async () => {
    const ids: string[] = await storeStatements([createStatement()]);
    assert.equal(isArray(ids), true);
    assert.equal(ids.length, 1);
  });
});
