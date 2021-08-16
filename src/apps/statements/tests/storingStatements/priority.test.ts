import assert from 'assert';
import { isArray } from 'lodash';
import { StatementProcessingPriority } from '../../enums/statementProcessingPriority.enum';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';

describe(__filename, () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);
  const TEST_ID_1 = '1c86d8e9-f325-404f-b3d9-24c451035583';
  const TEST_ID_2 = '1c86d8e9-f325-404f-b3d9-24c451035584';

  it('should store statements with priority equals to "LOW"', async () => {
    const ids: string[] = await storeStatements(
      [createStatement({ id: TEST_ID_1 }), createStatement({ id: TEST_ID_2 })],
      undefined,
      undefined,
      StatementProcessingPriority.LOW,
    );
    assert.equal(isArray(ids), true);
    assert.deepEqual(ids, [TEST_ID_1, TEST_ID_2]);
  });
});
