import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import getTestStates from '../../../utils/getTestStates';
import {
  TEST_INVALID_ACTIVITY_ID,
  TEST_INVALID_AGENT,
  TEST_INVALID_REGISTRATION,
  TEST_INVALID_TIMESTAMP,
} from '../../../utils/testValues';
import setup from '../utils/setup';

describe('getStates with non-existing agent', () => {
  setup();

  it('should return no state ids when getting a non-existing activity id', async () => {
    const statesResult = await getTestStates();
    assert.deepEqual(statesResult.stateIds, []);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    const promise = getTestStates({ activityId: TEST_INVALID_ACTIVITY_ID });
    await assertError(Warnings, promise);
  });

  it('should throw warnings when using an invalid agent', async () => {
    const promise = getTestStates({ agent: TEST_INVALID_AGENT });
    await assertError(Warnings, promise);
  });

  it('should throw warnings when using an invalid registration', async () => {
    const promise = getTestStates({ registration: TEST_INVALID_REGISTRATION });
    await assertError(Warnings, promise);
  });

  it('should throw warnings when using an invalid since', async () => {
    const promise = getTestStates({ since: TEST_INVALID_TIMESTAMP });
    await assertError(Warnings, promise);
  });
});
