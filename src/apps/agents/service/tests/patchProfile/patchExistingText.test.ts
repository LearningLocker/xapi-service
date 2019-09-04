import assertError from 'jscommons/dist/tests/utils/assertError';
import NonJsonObject from '../../../errors/NonJsonObject';
import createTextProfile from '../../../utils/createTextProfile';
import {
  JSON_CONTENT_TYPE,
  TEST_CONTENT,
  TEST_JSON_CONTENT,
  TEST_OBJECT_CONTENT,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import patchContent from './utils/patchContent';

describe('patchProfile with existing text content', () => {
  setup();

  it('should error when patching with text content', async () => {
    await createTextProfile();
    const promise = patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });

  it('should error when patching with JSON content', async () => {
    await createTextProfile();
    const promise = patchContent(TEST_JSON_CONTENT, JSON_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });

  it('should error when patching with object content', async () => {
    await createTextProfile();
    const promise = patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });
});
