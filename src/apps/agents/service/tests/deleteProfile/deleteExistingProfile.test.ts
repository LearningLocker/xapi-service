import assertDeleted from '../../../utils/assertDeleted';
import createJsonProfile from '../../../utils/createJsonProfile';
import createTextProfile from '../../../utils/createTextProfile';
import {
  TEST_ACCOUNT_AGENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import deleteProfile from './utils/deleteProfile';

describe('deleteProfile with existing state', () => {
  setup();

  it('should delete when deleting text', async () => {
    await createTextProfile();
    await deleteProfile();
    await assertDeleted();
  });

  it('should delete when deleting json', async () => {
    await createJsonProfile();
    await deleteProfile();
    await assertDeleted();
  });

  it('should delete when deleting with an mbox', async () => {
    await createTextProfile({ agent: TEST_MBOX_AGENT });
    await deleteProfile({ agent: TEST_MBOX_AGENT });
    await assertDeleted({ agent: TEST_MBOX_AGENT });
  });

  it('should delete when deleting with an mbox_sha1sum', async () => {
    await createTextProfile({ agent: TEST_MBOXSHA1_AGENT });
    await deleteProfile({ agent: TEST_MBOXSHA1_AGENT });
    await assertDeleted({ agent: TEST_MBOXSHA1_AGENT });
  });

  it('should delete when deleting with an openid', async () => {
    await createTextProfile({ agent: TEST_OPENID_AGENT });
    await deleteProfile({ agent: TEST_OPENID_AGENT });
    await assertDeleted({ agent: TEST_OPENID_AGENT });
  });

  it('should delete when deleting with an account', async () => {
    await createTextProfile({ agent: TEST_ACCOUNT_AGENT });
    await deleteProfile({ agent: TEST_ACCOUNT_AGENT });
    await assertDeleted({ agent: TEST_ACCOUNT_AGENT });
  });
});
