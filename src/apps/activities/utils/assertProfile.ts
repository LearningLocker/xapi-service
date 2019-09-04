import * as assert from 'assert';
import streamToString from 'stream-to-string';
import GetProfilesOptions from '../serviceFactory/options/GetProfilesOptions';
import getTestProfile from './getTestProfile';
import getTestProfiles from './getTestProfiles';
import { TEST_PROFILE_ID } from './testValues';

export default async (content: string, optsOverrides: Partial<GetProfilesOptions> = {}) => {
  const expectedProfileIds = [TEST_PROFILE_ID];

  // Checks the profileIds.
  const profilesResult = await getTestProfiles(optsOverrides);
  const actualProfileIds = profilesResult.profileIds;
  assert.deepEqual(actualProfileIds, expectedProfileIds);

  // Checks the content.
  const agentProfileResult = await getTestProfile(optsOverrides);
  const actualContent = await streamToString(agentProfileResult.content);
  assert.equal(actualContent, content);
  assert.equal(agentProfileResult.contentType.constructor, String);
  assert.equal(agentProfileResult.updatedAt.constructor, Date);
  assert.equal(agentProfileResult.etag.constructor, String);
};
