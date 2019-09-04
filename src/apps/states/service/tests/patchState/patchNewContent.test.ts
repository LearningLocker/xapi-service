import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import NonJsonObject from '../../../errors/NonJsonObject';
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

describe('patchState with new content', () => {
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
    await assertState(TEST_OBJECT_CONTENT);
  });

  it('should not throw warnings when patching without a registration', async () => {
    await patchState({ registration: undefined });
  });

  it('should throw warnings when using an invalid activity id', async () => {
    const promise = patchState({
      activityId: TEST_INVALID_ACTIVITY_ID,
    });
    await assertError(Warnings, promise);
  });

  it('should throw warnings when using an invalid agent', async () => {
    const promise = patchState({
      agent: TEST_INVALID_AGENT,
    });
    await assertError(Warnings, promise);
  });

  it('should throw warnings when using an invalid registration', async () => {
    const promise = patchState({
      registration: TEST_INVALID_REGISTRATION,
    });
    await assertError(Warnings, promise);
  });
});
