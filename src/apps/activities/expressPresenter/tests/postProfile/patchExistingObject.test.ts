import { BAD_REQUEST } from 'http-status-codes';
import assertImmutableProfile from '../../../utils/assertImmutableProfile';
import assertProfile from '../../../utils/assertProfile';
import createImmutableProfile from '../../../utils/createImmutableProfile';
import createObjectProfile from '../../../utils/createObjectProfile';
import {
  JSON_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_CONTENT,
  TEST_JSON_CONTENT,
  TEST_OBJECT_MERGED_CONTENT,
  TEST_OBJECT_PATCH_CONTENT,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import patchContent from './utils/patchContent';
import patchExistingProfile from './utils/patchExistingProfile';

describe('expressPresenter.postProfile with existing object content', () => {
  setup();

  it('should error when patching with text content', async () => {
    await createObjectProfile();
    await patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE).expect(BAD_REQUEST);
  });

  it('should error when patching with JSON content', async () => {
    await createObjectProfile();
    await patchContent(TEST_JSON_CONTENT, JSON_CONTENT_TYPE).expect(BAD_REQUEST);
  });

  it('should merge when patching with object content', async () => {
    await createObjectProfile();
    await patchExistingProfile(TEST_ACTIVITY_ID, TEST_OBJECT_PATCH_CONTENT);
    await assertProfile(TEST_OBJECT_MERGED_CONTENT);
  });

  it('should not patch existing models when patching a non-existing model', async () => {
    await createObjectProfile();
    await createImmutableProfile();
    await patchExistingProfile(TEST_ACTIVITY_ID);
    await assertImmutableProfile();
  });
});
