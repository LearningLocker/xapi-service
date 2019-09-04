import { BAD_REQUEST, NO_CONTENT } from 'http-status-codes';
import assertProfile from '../../../utils/assertProfile';
import {
  JSON_CONTENT_TYPE,
  TEST_CONTENT,
  TEST_INVALID_ACTIVITY_ID,
  TEST_INVALID_JSON_CONTENT,
  TEST_JSON_CONTENT,
  TEST_OBJECT_CONTENT,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import patchContent from './utils/patchContent';
import patchProfile from './utils/patchProfile';

describe('expressPresenter.postProfile with new content', () => {
  setup();

  it('should error when patching with text content', async () => {
    await patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE).expect(BAD_REQUEST);
  });

  it('should error when patching with JSON content', async () => {
    await patchContent(TEST_JSON_CONTENT, JSON_CONTENT_TYPE).expect(BAD_REQUEST);
  });

  it('should create when patching with object content', async () => {
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE).expect(NO_CONTENT);
    await assertProfile(TEST_OBJECT_CONTENT);
  });

  it('should throw warnings when using an invalid activityId', async () => {
    await patchProfile({
      activityId: TEST_INVALID_ACTIVITY_ID,
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the activityId', async () => {
    await patchProfile({ activityId: undefined }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the profile id', async () => {
    await patchProfile({ profileId: undefined }).expect(BAD_REQUEST);
  });

  it('should error when using invalid JSON', async () => {
    await patchProfile({}, TEST_INVALID_JSON_CONTENT).expect(BAD_REQUEST);
  });
});
