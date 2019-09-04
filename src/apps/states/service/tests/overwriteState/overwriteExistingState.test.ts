import assertImmutableState from '../../../utils/assertImmutableState';
import assertState from '../../../utils/assertState';
import createImmutableState from '../../../utils/createImmutableState';
import {
  TEST_ACCOUNT_AGENT,
  TEST_CONTENT,
  TEST_IMMUTABLE_CONTENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import overwriteState from './utils/overwriteState';

describe('overwriteState with existing model', () => {
  setup();

  it('should overwrite model when overwriting an existing model', async () => {
    await overwriteState({}, TEST_CONTENT);
    await overwriteState({}, TEST_IMMUTABLE_CONTENT);
    await assertState(TEST_IMMUTABLE_CONTENT);
  });

  it('should overwrite model when overwriting without a registration', async () => {
    await overwriteState({}, TEST_CONTENT);
    await overwriteState({ registration: undefined }, TEST_IMMUTABLE_CONTENT);
    await assertState(TEST_IMMUTABLE_CONTENT);
  });

  it('should not overwrite non-matched models', async () => {
    await overwriteState();
    await createImmutableState();
    await overwriteState();
    await assertImmutableState();
  });

  it('should overwrite model when overwriting with mbox', async () => {
    await overwriteState({ agent: TEST_MBOX_AGENT }, TEST_CONTENT);
    await overwriteState({ agent: TEST_MBOX_AGENT }, TEST_IMMUTABLE_CONTENT);
    await assertState(TEST_IMMUTABLE_CONTENT, { agent: TEST_MBOX_AGENT });
  });

  it('should overwrite model when overwriting with mbox_sha1sum', async () => {
    await overwriteState({ agent: TEST_MBOXSHA1_AGENT }, TEST_CONTENT);
    await overwriteState({ agent: TEST_MBOXSHA1_AGENT }, TEST_IMMUTABLE_CONTENT);
    await assertState(TEST_IMMUTABLE_CONTENT, { agent: TEST_MBOXSHA1_AGENT });
  });

  it('should overwrite model when overwriting with openid', async () => {
    await overwriteState({ agent: TEST_OPENID_AGENT }, TEST_CONTENT);
    await overwriteState({ agent: TEST_OPENID_AGENT }, TEST_IMMUTABLE_CONTENT);
    await assertState(TEST_IMMUTABLE_CONTENT, { agent: TEST_OPENID_AGENT });
  });

  it('should overwrite model when overwriting with account', async () => {
    await overwriteState({ agent: TEST_ACCOUNT_AGENT }, TEST_CONTENT);
    await overwriteState({ agent: TEST_ACCOUNT_AGENT }, TEST_IMMUTABLE_CONTENT);
    await assertState(TEST_IMMUTABLE_CONTENT, { agent: TEST_ACCOUNT_AGENT });
  });
});
