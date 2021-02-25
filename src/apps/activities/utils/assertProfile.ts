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
  assert.deepEqual(actualProfileIds, expectedProfileIds);

  // Checks the content.
  const agentProfileResult = await getTestProfile();
  const actualContent = await streamToString(agentProfileResult.content);
  assert.equal(actualContent, content);
  assert.equal(agentProfileResult.contentType.constructor, String);
  assert.equal(agentProfileResult.updatedAt.constructor, Date);
  assert.equal(agentProfileResult.etag.constructor, String);
};
