import * as assert from 'assert';
import { delay } from 'bluebird';
import createTextProfile from '../../../utils/createTextProfile';
import getTestProfiles from '../../../utils/getTestProfiles';
import { TEST_PROFILE_ID } from '../../../utils/testValues';
import setup from '../utils/setup';

const TEST_DELAY_MS = 2;

describe('getProfiles with since', () => {
  setup();

  const getProfiles = async (timestamp: Date) => {
    return getTestProfiles({
      since: timestamp.toISOString(),
    });
  };

  it('should return no profile ids when updated before since', async () => {
    await createTextProfile();
    await Promise.resolve(delay(TEST_DELAY_MS));
    const timestamp = new Date();
    const getProfilesResult = await getProfiles(timestamp);
    assert.deepEqual(getProfilesResult.profileIds, []);
  });

  it('should return the profile id when updated after since', async () => {
    const timestamp = new Date();
    await Promise.resolve(delay(TEST_DELAY_MS));
    await createTextProfile();
    const getProfilesResult = await getProfiles(timestamp);
    assert.deepEqual(getProfilesResult.profileIds, [TEST_PROFILE_ID]);
  });
});
