import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import {
  TEST_INVALID_ACTIVITY_ID,
  TEST_INVALID_AGENT,
  TEST_INVALID_REGISTRATION,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import getState from './utils/getState';

describe('expressPresenter.getState with non-existing model', () => {
  setup();

  it('should error when getting a non-existing model', async () => {
    await getState().expect(NOT_FOUND);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    await getState({
      activityId: TEST_INVALID_ACTIVITY_ID,
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when using an invalid agent', async () => {
    await getState({
      agent: JSON.stringify(TEST_INVALID_AGENT),
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when using invalid JSON for agent', async () => {
    await getState({
      agent: "{mbox'mailto:james@ht2.co.uk'}",
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when using an invalid registration', async () => {
    await getState({
      registration: TEST_INVALID_REGISTRATION,
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the activity id', async () => {
    await getState({ activityId: undefined }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the agent', async () => {
    await getState({ agent: undefined }).expect(BAD_REQUEST);
  });
});
