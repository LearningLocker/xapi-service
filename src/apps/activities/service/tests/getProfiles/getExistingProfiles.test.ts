import * as assert from 'assert';
import createTextProfile from '../../../utils/createTextProfile';
import getTestProfiles from '../../../utils/getTestProfiles';
import { TEST_PROFILE_ID } from '../../../utils/testValues';
import setup from '../utils/setup';

describe('getProfiles with existing model', () => {
  setup();

  it('should return profile ids when getting a existing model', async () => {
    await createTextProfile();
    const profilesResult = await getTestProfiles();
    assert.deepEqual(profilesResult.profileIds, [TEST_PROFILE_ID]);
  });
});
