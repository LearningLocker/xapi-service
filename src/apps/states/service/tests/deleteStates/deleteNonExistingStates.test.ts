import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import {
  TEST_INVALID_ACTIVITY_ID,
  TEST_INVALID_AGENT,
  TEST_INVALID_REGISTRATION,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import deleteStates from './utils/deleteStates';

describe('deleteStates with non-existing state', () => {
  setup();

  it('should not error when deleting', async () => {
    await deleteStates();
  });

  it('should throw warnings when using an invalid activity id', async () => {
    const promise = deleteStates({ activityId: TEST_INVALID_ACTIVITY_ID });
    await assertError(Warnings, promise);
  });

  it('should throw warnings when using an invalid agent', async () => {
    const promise = deleteStates({ agent: TEST_INVALID_AGENT });
    await assertError(Warnings, promise);
  });

  it('should throw warnings when using an invalid registration', async () => {
    const promise = deleteStates({ registration: TEST_INVALID_REGISTRATION });
    await assertError(Warnings, promise);
  });
});
