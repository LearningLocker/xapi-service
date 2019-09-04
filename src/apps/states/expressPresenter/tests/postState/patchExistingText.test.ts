import { BAD_REQUEST } from 'http-status-codes';
import createTextState from '../../../utils/createTextState';
import {
  JSON_CONTENT_TYPE,
  TEST_CONTENT,
  TEST_JSON_CONTENT,
  TEST_OBJECT_CONTENT,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import patchContent from './utils/patchContent';

describe('expressPresenter.postState with existing text content', () => {
  setup();

  it('should error when patching with text content', async () => {
    await createTextState();
    await patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE).expect(BAD_REQUEST);
  });

  it('should error when patching with JSON content', async () => {
    await createTextState();
    await patchContent(TEST_JSON_CONTENT, JSON_CONTENT_TYPE).expect(BAD_REQUEST);
  });

  it('should error when patching with object content', async () => {
    await createTextState();
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE).expect(BAD_REQUEST);
  });
});
