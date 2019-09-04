import assertImmutableProfile from '../../../utils/assertImmutableProfile';
import assertProfile from '../../../utils/assertProfile';
import createImmutableProfile from '../../../utils/createImmutableProfile';
import createTextProfile from '../../../utils/createTextProfile';
import {
  TEST_ACCOUNT_AGENT,
  TEST_IMMUTABLE_CONTENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
 } from '../../../utils/testValues';
import setup from '../utils/setup';
import overwriteExistingProfile from './utils/overwriteExistingProfile';

describe('expressPresenter.putProfile with existing model', () => {
  setup();

  it('should overwrite model when overwriting an existing model', async () => {
    await createTextProfile();
    await overwriteExistingProfile(TEST_MBOX_AGENT, TEST_IMMUTABLE_CONTENT);
    await assertProfile(TEST_IMMUTABLE_CONTENT);
  });

  it('should not overwrite non-matched models', async () => {
    await createTextProfile();
    await createImmutableProfile();
    await overwriteExistingProfile(TEST_MBOX_AGENT);
    await assertImmutableProfile();
  });

  it('should overwrite model when overwriting with mbox', async () => {
    await createTextProfile({ agent: TEST_MBOX_AGENT });
    await overwriteExistingProfile(TEST_MBOX_AGENT, TEST_IMMUTABLE_CONTENT);
    await assertProfile(TEST_IMMUTABLE_CONTENT, { agent: TEST_MBOX_AGENT });
  });

  it('should overwrite model when overwriting with mbox_sha1sum', async () => {
    await createTextProfile({ agent: TEST_MBOXSHA1_AGENT });
    await overwriteExistingProfile(TEST_MBOXSHA1_AGENT, TEST_IMMUTABLE_CONTENT);
    await assertProfile(TEST_IMMUTABLE_CONTENT, { agent: TEST_MBOXSHA1_AGENT });
  });

  it('should overwrite model when overwriting with openid', async () => {
    await createTextProfile({ agent: TEST_OPENID_AGENT });
    await overwriteExistingProfile(TEST_OPENID_AGENT, TEST_IMMUTABLE_CONTENT);
    await assertProfile(TEST_IMMUTABLE_CONTENT, { agent: TEST_OPENID_AGENT });
  });

  it('should overwrite model when overwriting with account', async () => {
    await createTextProfile({ agent: TEST_ACCOUNT_AGENT });
    await overwriteExistingProfile(TEST_ACCOUNT_AGENT, TEST_IMMUTABLE_CONTENT);
    await assertProfile(TEST_IMMUTABLE_CONTENT, { agent: TEST_ACCOUNT_AGENT });
  });
});
