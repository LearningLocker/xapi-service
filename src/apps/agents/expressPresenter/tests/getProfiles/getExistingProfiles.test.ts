import { OK } from 'http-status-codes';
import createTextProfile from '../../../utils/createTextProfile';
import {
  TEST_ACCOUNT_AGENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
  TEST_PROFILE_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import getProfiles from './utils/getProfiles';

describe('expressPresenter.getProfiles with existing model', () => {
  setup();

  it('should return profile ids when getting a existing model', async () => {
    await createTextProfile();
    await getProfiles().expect(OK, [TEST_PROFILE_ID]);
  });

  it('should return profile ids when using an mbox', async () => {
    await createTextProfile({ agent: TEST_MBOX_AGENT });
    await getProfiles({ agent: JSON.stringify(TEST_MBOX_AGENT) })
      .expect(OK, [TEST_PROFILE_ID]);
  });

  it('should return profile ids when using an mbox_sha1sum', async () => {
    await createTextProfile({ agent: TEST_MBOXSHA1_AGENT });
    await getProfiles({ agent: JSON.stringify(TEST_MBOXSHA1_AGENT) })
      .expect(OK, [TEST_PROFILE_ID]);
  });

  it('should return profile ids when using an openid', async () => {
    await createTextProfile({ agent: TEST_OPENID_AGENT });
    await getProfiles({ agent: JSON.stringify(TEST_OPENID_AGENT) })
      .expect(OK, [TEST_PROFILE_ID]);
  });

  it('should return profile ids when using an account', async () => {
    await createTextProfile({ agent: TEST_ACCOUNT_AGENT });
    await getProfiles({ agent: JSON.stringify(TEST_ACCOUNT_AGENT) })
      .expect(OK, [TEST_PROFILE_ID]);
  });
});
