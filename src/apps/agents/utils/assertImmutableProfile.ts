import * as assert from 'assert';
import streamToString from 'stream-to-string';
import service from './testService';
import {
  TEST_CLIENT,
  TEST_IMMUTABLE_AGENT,
  TEST_IMMUTABLE_CONTENT,
  TEST_PROFILE_ID,
} from './testValues';

export default async () => {
  const expectedProfileIds = [TEST_PROFILE_ID];

  // Checks the profileIds.
  const profilesResult = await service.getProfiles({
    agent: TEST_IMMUTABLE_AGENT,
    client: TEST_CLIENT,
  });
  const actualProfileIds = profilesResult.profileIds;
  assert.deepStrictEqual(actualProfileIds, expectedProfileIds);

  // Checks the content.
  const agentProfileResult = await service.getProfile({
    agent: TEST_IMMUTABLE_AGENT,
    client: TEST_CLIENT,
    profileId: TEST_PROFILE_ID,
  });
  const actualContent = await streamToString(agentProfileResult.content);
  assert.strictEqual(actualContent, TEST_IMMUTABLE_CONTENT);
  assert.strictEqual(agentProfileResult.contentType.constructor, String);
  assert.strictEqual(agentProfileResult.updatedAt.constructor, Date);
  assert.strictEqual(agentProfileResult.etag.constructor, String);
};
