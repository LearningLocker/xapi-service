import assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { isArray } from 'lodash';
import Conflict from '../../errors/Conflict';
import DuplicateId from '../../errors/DuplicateId';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_STATEMENT = createStatement({ id: TEST_ID });
const TEST_CONFLICT = createStatement({
  id: TEST_ID,
  actor: { mbox: 'mailto:test2@example.com' },
});

describe('store statement conflicts', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  it('should store statements when they use an existing id without conflicts in 2 batches',
    async () => {
      await storeStatements([TEST_STATEMENT]);
      const ids: string[] = await storeStatements([TEST_STATEMENT]);
      assert.equal(isArray(ids), true);
      assert.deepEqual(ids, [TEST_ID]);
    },
  );

  it('should not store statements when they use an existing id with conflicts in 2 batches',
    async () => {
      await storeStatements([TEST_STATEMENT]);
      const promise = storeStatements([TEST_CONFLICT]);
      await assertError(Conflict, promise);
    },
  );

  it('should not store statements when they use an existing id without conflicts in 1 batch',
    async () => {
      const promise = storeStatements([TEST_STATEMENT, TEST_STATEMENT]);
      await assertError(DuplicateId, promise);
    },
  );

  it('should not store statements when they use an existing id with conflicts in 1 batch',
    async () => {
      const promise = storeStatements([TEST_STATEMENT, TEST_CONFLICT]);
      await assertError(DuplicateId, promise);
    },
  );
});
