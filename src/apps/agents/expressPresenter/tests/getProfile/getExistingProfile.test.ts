import { OK } from 'http-status-codes';
import createJsonProfile from '../../../utils/createJsonProfile';
import createTextProfile from '../../../utils/createTextProfile';
import {
  TEST_ACCOUNT_AGENT,
  TEST_CONTENT,
  TEST_JSON_CONTENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import getProfile from './utils/getProfile';

describe('expressPresenter.getProfile with existing state', () => {
  setup();

  it('should get when getting text', async () => {
    await createTextProfile();
    await getProfile().expect(OK, TEST_CONTENT);
  });

  it('should get when agent properties are in a different order', async () => {
    // tslint:disable:object-literal-sort-keys
    const creationAgent = {
      objectType: 'Agent',
      account: {
        name: 'steely.eyed',
        homePage: 'http://missile.man',
      },
    };
    const retrievalAgent = JSON.stringify({
      objectType: 'Agent',
      account: {
        homePage: 'http://missile.man',
        name: 'steely.eyed',
      },
    });
    // tslint:enable:object-literal-sort-keys
    await createTextProfile({ agent: creationAgent });
    await getProfile({ agent: retrievalAgent }).expect(OK, TEST_CONTENT);
  });

  it('should get when getting json', async () => {
    await createJsonProfile();
    await getProfile().expect(OK, JSON.parse(TEST_JSON_CONTENT));
  });

  it('should get when not using mbox', async () => {
    await createTextProfile({ agent: TEST_MBOX_AGENT });
    await getProfile({ agent: JSON.stringify(TEST_MBOX_AGENT) })
      .expect(OK, TEST_CONTENT);
  });

  it('should get when not using mbox_sha1sum', async () => {
    await createTextProfile({ agent: TEST_MBOXSHA1_AGENT });
    await getProfile({ agent: JSON.stringify(TEST_MBOXSHA1_AGENT) })
      .expect(OK, TEST_CONTENT);
  });

  it('should get when not using openid', async () => {
    await createTextProfile({ agent: TEST_OPENID_AGENT });
    await getProfile({ agent: JSON.stringify(TEST_OPENID_AGENT) })
      .expect(OK, TEST_CONTENT);
  });

  it('should get when not using account', async () => {
    await createTextProfile({ agent: TEST_ACCOUNT_AGENT });
    await getProfile({ agent: JSON.stringify(TEST_ACCOUNT_AGENT) })
      .expect(OK, TEST_CONTENT);
  });
});
