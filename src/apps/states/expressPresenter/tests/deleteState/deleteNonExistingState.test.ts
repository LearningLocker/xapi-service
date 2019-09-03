import { BAD_REQUEST, NO_CONTENT } from 'http-status-codes';
import {
  TEST_INVALID_ACTIVITY_ID,
  TEST_INVALID_AGENT,
  TEST_INVALID_REGISTRATION,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import deleteState from './utils/deleteState';

describe('expressPresenter.deleteState with non-existing state', () => {
  setup();

  it('should return when deleting', async () => {
    await deleteState().expect(NO_CONTENT);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    await deleteState({
      activityId: TEST_INVALID_ACTIVITY_ID,
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when using an invalid agent', async () => {
    await deleteState({
      agent: JSON.stringify(TEST_INVALID_AGENT),
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when using an invalid registration', async () => {
    await deleteState({
      registration: TEST_INVALID_REGISTRATION,
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the activity id', async () => {
    await deleteState({ activityId: undefined }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the agent', async () => {
    await deleteState({ agent: undefined }).expect(BAD_REQUEST);
  });
});
