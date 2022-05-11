import * as assert from 'assert';
import streamToString from 'stream-to-string';
import getTestProfile from './getTestProfile';
import getTestProfiles from './getTestProfiles';
import { TEST_PROFILE_ID } from './testValues';

export default async (content: string) => {
  const expectedProfileIds = [TEST_PROFILE_ID];

  // Checks the profileIds.
  const profilesResult = await getTestProfiles();
  const actualProfileIds = profilesResult.profileIds;
  assert.deepStrictEqual(actualProfileIds, expectedProfileIds);

  // Checks the content.
  const agentProfileResult = await getTestProfile();
  const actualContent = await streamToString(agentProfileResult.content);
  assert.strictEqual(actualContent, content);
  assert.strictEqual(agentProfileResult.contentType.constructor, String);
  assert.strictEqual(agentProfileResult.updatedAt.constructor, Date);
  assert.strictEqual(agentProfileResult.etag.constructor, String);
};
