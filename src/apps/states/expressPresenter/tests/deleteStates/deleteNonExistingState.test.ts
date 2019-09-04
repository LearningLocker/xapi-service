import { BAD_REQUEST, NO_CONTENT } from 'http-status-codes';
import {
  TEST_INVALID_ACTIVITY_ID,
  TEST_INVALID_AGENT,
  TEST_INVALID_REGISTRATION,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import deleteStates from './utils/deleteStates';

describe('expressPresenter.deleteStates with non-existing state', () => {
  setup();

  it('should not error when deleting', async () => {
    await deleteStates().expect(NO_CONTENT);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    await deleteStates({
      activityId: TEST_INVALID_ACTIVITY_ID,
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when using an invalid agent', async () => {
    await deleteStates({
      agent: JSON.stringify(TEST_INVALID_AGENT),
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when using an invalid registration', async () => {
    await deleteStates({
      registration: TEST_INVALID_REGISTRATION,
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the activity id', async () => {
    await deleteStates({ activityId: undefined }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the agent', async () => {
    await deleteStates({ agent: undefined }).expect(BAD_REQUEST);
  });
});
