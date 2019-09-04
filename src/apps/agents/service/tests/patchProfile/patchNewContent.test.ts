import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import JsonSyntaxError from '../../../errors/JsonSyntaxError';
import NonJsonObject from '../../../errors/NonJsonObject';
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

describe('patchProfile with new content', () => {
  setup();

  it('should error when patching with text content', async () => {
    const promise = patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });

  it('should error when patching with JSON content', async () => {
    const promise = patchContent(TEST_JSON_CONTENT, JSON_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });

  it('should create when patching with object content', async () => {
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await assertProfile(TEST_OBJECT_CONTENT);
  });

  it('should throw warnings when using an invalid agent', async () => {
    const promise = patchProfile({
      agent: TEST_INVALID_AGENT,
    });
    await assertError(Warnings, promise);
  });

  it('should throw warnings when using an invalid json content', async () => {
    const promise = patchContent(TEST_INVALID_JSON_CONTENT, JSON_CONTENT_TYPE);
    await assertError(JsonSyntaxError, promise);
  });
});
