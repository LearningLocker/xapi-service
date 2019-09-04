import * as assert from 'assert';
import streamToString from 'stream-to-string';
import service from './testService';
import {
  TEST_CLIENT,
  TEST_IMMUTABLE_ACTIVITY_ID,
  TEST_IMMUTABLE_CONTENT,
  TEST_PROFILE_ID,
} from './testValues';

export default async () => {
  const expectedProfileIds = [TEST_PROFILE_ID];

  // Checks the profileIds.
  const profilesResult = await service.getProfiles({
    activityId: TEST_IMMUTABLE_ACTIVITY_ID,
    client: TEST_CLIENT,
  });
  const actualProfileIds = profilesResult.profileIds;
  assert.deepEqual(actualProfileIds, expectedProfileIds);

  // Checks the content.
  const profileResult = await service.getProfile({
    activityId: TEST_IMMUTABLE_ACTIVITY_ID,
    client: TEST_CLIENT,
    profileId: TEST_PROFILE_ID,
  });
  const actualContent = await streamToString(profileResult.content);
  assert.equal(actualContent, TEST_IMMUTABLE_CONTENT);
  assert.equal(profileResult.contentType.constructor, String);
  assert.equal(profileResult.updatedAt.constructor, Date);
  assert.equal(profileResult.etag.constructor, String);
};
