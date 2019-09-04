import * as assert from 'assert';
import createTextProfile from '../../../utils/createTextProfile';
import getTestProfiles from '../../../utils/getTestProfiles';
import {
  TEST_ACCOUNT_AGENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
  TEST_PROFILE_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';

describe('getProfiles with existing model', () => {
  setup();

  it('should return profile ids when getting a existing model', async () => {
    await createTextProfile();
    const profilesResult = await getTestProfiles();
    assert.deepEqual(profilesResult.profileIds, [TEST_PROFILE_ID]);
  });

  it('should return profile ids when using an mbox', async () => {
    await createTextProfile({ agent: TEST_MBOX_AGENT });
    const profilesResult = await getTestProfiles({ agent: TEST_MBOX_AGENT });
    assert.deepEqual(profilesResult.profileIds, [TEST_PROFILE_ID]);
  });

  it('should return profile ids when using an mbox_sha1sum', async () => {
    await createTextProfile({ agent: TEST_MBOXSHA1_AGENT });
    const profilesResult = await getTestProfiles({ agent: TEST_MBOXSHA1_AGENT });
    assert.deepEqual(profilesResult.profileIds, [TEST_PROFILE_ID]);
  });

  it('should return profile ids when using an openid', async () => {
    await createTextProfile({ agent: TEST_OPENID_AGENT });
    const profilesResult = await getTestProfiles({ agent: TEST_OPENID_AGENT });
    assert.deepEqual(profilesResult.profileIds, [TEST_PROFILE_ID]);
  });

  it('should return profile ids when using an account', async () => {
    await createTextProfile({ agent: TEST_ACCOUNT_AGENT });
    const profilesResult = await getTestProfiles({ agent: TEST_ACCOUNT_AGENT });
    assert.deepEqual(profilesResult.profileIds, [TEST_PROFILE_ID]);
  });
});
