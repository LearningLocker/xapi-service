import * as assert from 'assert';
import streamToString from 'stream-to-string';
import GetProfileResult from '../../../serviceFactory/results/GetProfileResult';
import createJsonProfile from '../../../utils/createJsonProfile';
import createTextProfile from '../../../utils/createTextProfile';
import getTestProfile from '../../../utils/getTestProfile';
import {
  JSON_CONTENT_TYPE,
  TEST_ACCOUNT_AGENT,
  TEST_CONTENT,
  TEST_JSON_CONTENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import setup from '../utils/setup';

describe('getProfile with existing profile', () => {
  setup();

  const assertGetProfile = async (
    result: GetProfileResult,
    content: string,
    contentType: string,
  ) => {
    const actualContent = await streamToString(result.content);
    assert.equal(actualContent, content);
    assert.equal(result.contentType, contentType);
    assert.equal(result.updatedAt.constructor, Date);
    assert.equal(result.etag.constructor, String);
  };

  it('should get when getting text', async () => {
    await createTextProfile();
    const agentProfileResult = await getTestProfile();
    await assertGetProfile(agentProfileResult, TEST_CONTENT, TEXT_CONTENT_TYPE);
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
    const retrievalAgent = {
      objectType: 'Agent',
      account: {
        homePage: 'http://missile.man',
        name: 'steely.eyed',
      },
    };
    // tslint:enable:object-literal-sort-keys
    await createTextProfile({ agent: creationAgent });
    const agentProfileResult = await getTestProfile({ agent: retrievalAgent });
    await assertGetProfile(agentProfileResult, TEST_CONTENT, TEXT_CONTENT_TYPE);
  });

  it('should get when getting json', async () => {
    await createJsonProfile();
    const agentProfileResult = await getTestProfile();
    await assertGetProfile(agentProfileResult, TEST_JSON_CONTENT, JSON_CONTENT_TYPE);
  });

  it('should get when using an mbox', async () => {
    await createTextProfile({ agent: TEST_MBOX_AGENT });
    const agentProfileResult = await getTestProfile({ agent: TEST_MBOX_AGENT });
    await assertGetProfile(agentProfileResult, TEST_CONTENT, TEXT_CONTENT_TYPE);
  });

  it('should get when using an mbox_sha1sum', async () => {
    await createTextProfile({ agent: TEST_MBOXSHA1_AGENT });
    const agentProfileResult = await getTestProfile({ agent: TEST_MBOXSHA1_AGENT });
    await assertGetProfile(agentProfileResult, TEST_CONTENT, TEXT_CONTENT_TYPE);
  });

  it('should get when using an openid', async () => {
    await createTextProfile({ agent: TEST_OPENID_AGENT });
    const agentProfileResult = await getTestProfile({ agent: TEST_OPENID_AGENT });
    await assertGetProfile(agentProfileResult, TEST_CONTENT, TEXT_CONTENT_TYPE);
  });

  it('should get when using an account', async () => {
    await createTextProfile({ agent: TEST_ACCOUNT_AGENT });
    const agentProfileResult = await getTestProfile({ agent: TEST_ACCOUNT_AGENT });
    await assertGetProfile(agentProfileResult, TEST_CONTENT, TEXT_CONTENT_TYPE);
  });
});
