import { BAD_REQUEST, NO_CONTENT } from 'http-status-codes';
import assertState from '../../../utils/assertState';
import {
  JSON_CONTENT_TYPE,
  TEST_CONTENT,
  TEST_INVALID_ACTIVITY_ID,
  TEST_INVALID_AGENT,
  TEST_INVALID_REGISTRATION,
  TEST_JSON_CONTENT,
  TEST_OBJECT_CONTENT,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import patchContent from './utils/patchContent';
import patchState from './utils/patchState';

describe('expressPresenter.postState with new content', () => {
  setup();

  it('should error when patching with text content', async () => {
    await patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE).expect(BAD_REQUEST);
  });

  it('should error when patching with JSON content', async () => {
    await patchContent(TEST_JSON_CONTENT, JSON_CONTENT_TYPE).expect(BAD_REQUEST);
  });

  it('should create when patching with object content', async () => {
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE).expect(NO_CONTENT);
    await assertState(TEST_OBJECT_CONTENT);
  });

  it('should not throw warnings when patching without a registration', async () => {
    await patchState({ registration: undefined }).expect(NO_CONTENT);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    await patchState({
      activityId: TEST_INVALID_ACTIVITY_ID,
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when using an invalid agent', async () => {
    await patchState({
      agent: JSON.stringify(TEST_INVALID_AGENT),
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when using an invalid registration', async () => {
    await patchState({
      registration: TEST_INVALID_REGISTRATION,
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the activity id', async () => {
    await patchState({ activityId: undefined }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the agent', async () => {
    await patchState({ agent: undefined }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the state id', async () => {
    await patchState({ stateId: undefined }).expect(BAD_REQUEST);
  });
});
