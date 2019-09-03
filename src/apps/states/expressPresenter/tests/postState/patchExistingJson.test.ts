import { BAD_REQUEST } from 'http-status-codes';
import createJsonState from '../../../utils/createJsonState';
import {
  JSON_CONTENT_TYPE,
  TEST_CONTENT,
  TEST_JSON_CONTENT,
  TEST_OBJECT_CONTENT,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import patchContent from './utils/patchContent';

describe('expressPresenter.postState with existing JSON content', () => {
  setup();

  it('should 400 without version header', async () => {
    await createJsonState();
    await patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE, false).expect(BAD_REQUEST);
  });

  it('should error when patching with text content', async () => {
    await createJsonState();
    await patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE).expect(BAD_REQUEST);
  });

  it('should error when patching with JSON content', async () => {
    await createJsonState();
    await patchContent(TEST_JSON_CONTENT, JSON_CONTENT_TYPE).expect(BAD_REQUEST);
  });

  it('should error when patching with object content', async () => {
    await createJsonState();
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE).expect(BAD_REQUEST);
  });
});
