import { BAD_REQUEST, NO_CONTENT } from 'http-status-codes';
import assertState from '../../../utils/assertState';
import {
  TEST_CONTENT,
  TEST_INVALID_ACTIVITY_ID,
  TEST_INVALID_AGENT,
  TEST_INVALID_REGISTRATION,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import overwriteState from './utils/overwriteState';

describe('expressPresenter.putState with non-existing model', () => {
  setup();

  it('should create when using valid activity id', async () => {
    await overwriteState().expect(NO_CONTENT);
    await assertState(TEST_CONTENT);
  });

  it('should not throw warnings when not using registration', async () => {
    await overwriteState({ registration: undefined }).expect(NO_CONTENT);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    await overwriteState({
      activityId: TEST_INVALID_ACTIVITY_ID,
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when using an invalid agent', async () => {
    await overwriteState({
      agent: JSON.stringify(TEST_INVALID_AGENT),
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when using an invalid registration', async () => {
    await overwriteState({
      registration: TEST_INVALID_REGISTRATION,
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the activity id', async () => {
    await overwriteState({ activityId: undefined }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the agent', async () => {
    await overwriteState({ agent: undefined }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the state id', async () => {
    await overwriteState({ stateId: undefined }).expect(BAD_REQUEST);
  });
});
