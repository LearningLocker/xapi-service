import assertImmutableProfile from '../../../utils/assertImmutableProfile';
import assertProfile from '../../../utils/assertProfile';
import createImmutableProfile from '../../../utils/createImmutableProfile';
import {
  TEST_ACCOUNT_AGENT,
  TEST_CONTENT,
  TEST_IMMUTABLE_CONTENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import overwriteProfile from './utils/overwriteProfile';

describe('overwriteProfile with existing model', () => {
  setup();

  it('should overwrite model when overwriting an existing model', async () => {
    await overwriteProfile({}, TEST_CONTENT);
    await overwriteProfile({}, TEST_IMMUTABLE_CONTENT);
    await assertProfile(TEST_IMMUTABLE_CONTENT);
  });

  it('should not overwrite non-matched models', async () => {
    await overwriteProfile();
    await createImmutableProfile();
    await overwriteProfile();
    await assertImmutableProfile();
  });

  it('should overwrite model when overwriting with mbox', async () => {
    await overwriteProfile({ agent: TEST_MBOX_AGENT }, TEST_CONTENT);
    await overwriteProfile({ agent: TEST_MBOX_AGENT }, TEST_IMMUTABLE_CONTENT);
    await assertProfile(TEST_IMMUTABLE_CONTENT, { agent: TEST_MBOX_AGENT });
  });

  it('should overwrite model when overwriting with mbox_sha1sum', async () => {
    await overwriteProfile({ agent: TEST_MBOXSHA1_AGENT }, TEST_CONTENT);
    await overwriteProfile({ agent: TEST_MBOXSHA1_AGENT }, TEST_IMMUTABLE_CONTENT);
    await assertProfile(TEST_IMMUTABLE_CONTENT, { agent: TEST_MBOXSHA1_AGENT });
  });

  it('should overwrite model when overwriting with openid', async () => {
    await overwriteProfile({ agent: TEST_OPENID_AGENT }, TEST_CONTENT);
    await overwriteProfile({ agent: TEST_OPENID_AGENT }, TEST_IMMUTABLE_CONTENT);
    await assertProfile(TEST_IMMUTABLE_CONTENT, { agent: TEST_OPENID_AGENT });
  });

  it('should overwrite model when overwriting with account', async () => {
    await overwriteProfile({ agent: TEST_ACCOUNT_AGENT }, TEST_CONTENT);
    await overwriteProfile({ agent: TEST_ACCOUNT_AGENT }, TEST_IMMUTABLE_CONTENT);
    await assertProfile(TEST_IMMUTABLE_CONTENT, { agent: TEST_ACCOUNT_AGENT });
  });
});
