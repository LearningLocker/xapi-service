import * as assert from 'assert';
import streamToString from 'stream-to-string';
import GetProfileResult from '../../../serviceFactory/results/GetProfileResult';
import createJsonProfile from '../../../utils/createJsonProfile';
import createTextProfile from '../../../utils/createTextProfile';
import getTestProfile from '../../../utils/getTestProfile';
import {
  JSON_CONTENT_TYPE,
  TEST_CONTENT,
  TEST_JSON_CONTENT,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import setup from '../utils/setup';

describe('getProfile with existing state', () => {
  setup();

  const assertGetProfile = async (
    result: GetProfileResult,
    content: string,
    contentType: string,
  ) => {
    const actualContent = await streamToString(result.content);
    assert.strictEqual(actualContent, content);
    assert.strictEqual(result.contentType, contentType);
    assert.strictEqual(result.updatedAt.constructor, Date);
    assert.strictEqual(result.etag.constructor, String);
  };

  it('should get when getting text', async () => {
    await createTextProfile();
    const agentProfileResult = await getTestProfile();
    await assertGetProfile(agentProfileResult, TEST_CONTENT, TEXT_CONTENT_TYPE);
  });

  it('should get when getting json', async () => {
    await createJsonProfile();
    const agentProfileResult = await getTestProfile();
    await assertGetProfile(agentProfileResult, TEST_JSON_CONTENT, JSON_CONTENT_TYPE);
  });
});
