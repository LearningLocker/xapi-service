import assertDeleted from '../../../utils/assertDeleted';
import assertImmutableState from '../../../utils/assertImmutableState';
import createImmutableState from '../../../utils/createImmutableState';
import createJsonState from '../../../utils/createJsonState';
import createTextState from '../../../utils/createTextState';
import {
  TEST_ACCOUNT_AGENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import deleteStates from './utils/deleteStates';

describe('deleteStates with existing state', () => {
  setup();

  it('should delete when deleting text', async () => {
    await createTextState();
    await deleteStates();
    await assertDeleted();
  });

  it('should delete when deleting json', async () => {
    await createJsonState();
    await deleteStates();
    await assertDeleted();
  });

  it('should delete when deleting without registration', async () => {
    await createTextState();
    await deleteStates({ registration: undefined });
    await assertDeleted();
  });

  it('should not delete when deleting existing model without a registration with one', async () => {
    await createImmutableState({ registration: undefined });
    await deleteStates();
    await assertImmutableState({ registration: undefined }, { registration: undefined });
  });

  it('should delete when deleting with an mbox', async () => {
    await createTextState({ agent: TEST_MBOX_AGENT });
    await deleteStates({ agent: TEST_MBOX_AGENT });
    await assertDeleted({ agent: TEST_MBOX_AGENT });
  });

  it('should delete when deleting with an mbox_sha1sum', async () => {
    await createTextState({ agent: TEST_MBOXSHA1_AGENT });
    await deleteStates({ agent: TEST_MBOXSHA1_AGENT });
    await assertDeleted({ agent: TEST_MBOXSHA1_AGENT });
  });

  it('should delete when deleting with an openid', async () => {
    await createTextState({ agent: TEST_OPENID_AGENT });
    await deleteStates({ agent: TEST_OPENID_AGENT });
    await assertDeleted({ agent: TEST_OPENID_AGENT });
  });

  it('should delete when deleting with an account', async () => {
    await createTextState({ agent: TEST_ACCOUNT_AGENT });
    await deleteStates({ agent: TEST_ACCOUNT_AGENT });
    await assertDeleted({ agent: TEST_ACCOUNT_AGENT });
  });
});
