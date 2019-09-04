import assertError from 'jscommons/dist/tests/utils/assertError';
import NonJsonObject from '../../../errors/NonJsonObject';
import assertImmutableProfile from '../../../utils/assertImmutableProfile';
import assertProfile from '../../../utils/assertProfile';
import createImmutableProfile from '../../../utils/createImmutableProfile';
import createObjectProfile from '../../../utils/createObjectProfile';
import {
  JSON_CONTENT_TYPE,
  TEST_CONTENT,
  TEST_JSON_CONTENT,
  TEST_OBJECT_MERGED_CONTENT,
  TEST_OBJECT_PATCH_CONTENT,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import patchContent from './utils/patchContent';
import patchProfile from './utils/patchProfile';

describe('patchProfile with existing object content', () => {
  setup();

  it('should error when patching with text content', async () => {
    await createObjectProfile();
    const promise = patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });

  it('should error when patching with JSON content', async () => {
    await createObjectProfile();
    const promise = patchContent(TEST_JSON_CONTENT, JSON_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });

  it('should merge when patching with object content', async () => {
    await createObjectProfile();
    await patchContent(TEST_OBJECT_PATCH_CONTENT, JSON_CONTENT_TYPE);
    await assertProfile(TEST_OBJECT_MERGED_CONTENT);
  });

  it('should not patch existing models when patching a non-existing model', async () => {
    await createObjectProfile();
    await createImmutableProfile();
    await patchProfile();
    await assertImmutableProfile();
  });
});
