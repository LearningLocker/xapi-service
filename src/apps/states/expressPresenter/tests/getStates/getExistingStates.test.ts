import { BAD_REQUEST, OK } from 'http-status-codes';
import createTextState from '../../../utils/createTextState';
import {
  TEST_ACCOUNT_AGENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import getStates from './utils/getStates';

describe('expressPresenter.getStates with existing model', () => {
  setup();

  it('should 400 without version header', async () => {
    await createTextState();
    await getStates({}, false).expect(BAD_REQUEST);
  });

  it('should return state ids when getting a existing model', async () => {
    await createTextState();
    await getStates().expect(OK, [TEST_STATE_ID]);
  });

  it('should return state ids when not using registration', async () => {
    await createTextState();
    await getStates({ registration: undefined }).expect(OK, [TEST_STATE_ID]);
  });

  it('should return no ids when getting existing model without a registration with one',
    async () => {
      await createTextState({ registration: undefined });
      await getStates().expect(OK, []);
    },
  );

  it('should return state ids when using an mbox', async () => {
    await createTextState({ agent: TEST_MBOX_AGENT });
    await getStates({ agent: JSON.stringify(TEST_MBOX_AGENT) })
      .expect(OK, [TEST_STATE_ID]);
  });

  it('should return state ids when using an mbox_sha1sum', async () => {
    await createTextState({ agent: TEST_MBOXSHA1_AGENT });
    await getStates({ agent: JSON.stringify(TEST_MBOXSHA1_AGENT) })
      .expect(OK, [TEST_STATE_ID]);
  });

  it('should return state ids when using an openid', async () => {
    await createTextState({ agent: TEST_OPENID_AGENT });
    await getStates({ agent: JSON.stringify(TEST_OPENID_AGENT) })
      .expect(OK, [TEST_STATE_ID]);
  });

  it('should return state ids when using an account', async () => {
    await createTextState({ agent: TEST_ACCOUNT_AGENT });
    await getStates({ agent: JSON.stringify(TEST_ACCOUNT_AGENT) })
      .expect(OK, [TEST_STATE_ID]);
  });
});
