import { BAD_REQUEST, NO_CONTENT } from 'http-status-codes';
import assertProfile from '../../../utils/assertProfile';
import {
  JSON_CONTENT_TYPE,
  TEST_CONTENT,
  TEST_INVALID_AGENT,
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

  it('should throw warnings when using an invalid agent', async () => {
    await patchProfile({
      agent: JSON.stringify(TEST_INVALID_AGENT),
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when using invalid json in agent', async () => {
    await patchProfile({
      agent: TEST_INVALID_JSON_CONTENT,
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the agent', async () => {
    await patchProfile({ agent: undefined }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the profile id', async () => {
    await patchProfile({ profileId: undefined }).expect(BAD_REQUEST);
  });

  it('should throw warnings when using an invalid json content', async () => {
    await patchContent(TEST_INVALID_JSON_CONTENT, JSON_CONTENT_TYPE)
      .expect(BAD_REQUEST);
  });
});
