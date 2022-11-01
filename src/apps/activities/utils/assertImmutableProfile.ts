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
  assert.deepStrictEqual(actualProfileIds, expectedProfileIds);

  // Checks the content.
  const profileResult = await service.getProfile({
    activityId: TEST_IMMUTABLE_ACTIVITY_ID,
    client: TEST_CLIENT,
    profileId: TEST_PROFILE_ID,
  });
  const actualContent = await streamToString(profileResult.content);
  assert.strictEqual(actualContent, TEST_IMMUTABLE_CONTENT);
  assert.strictEqual(profileResult.contentType.constructor, String);
  assert.strictEqual(profileResult.updatedAt.constructor, Date);
  assert.strictEqual(profileResult.etag.constructor, String);
};
