import * as assert from 'assert';
import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import getTestProfile from './getTestProfile';
import getTestProfiles from './getTestProfiles';

export default async () => {
  // Asserts that the agent has no profiles.
  const getProfilesResult = await getTestProfiles();
  assert.deepEqual([], getProfilesResult.profileIds);

  // Asserts that the profile does not exist.
  const getProfilePromise = getTestProfile();
  await assertError(NoModel, getProfilePromise);
};
