// tslint:disable:max-file-line-count
import * as assert from 'assert';
import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import streamToString from 'stream-to-string';
import GetStateResult from '../../../serviceFactory/results/GetStateResult';
import createJsonState from '../../../utils/createJsonState';
import createTextState from '../../../utils/createTextState';
import getTestState from '../../../utils/getTestState';
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

describe('getState with existing state', () => {
  setup();

  const assertGetState = async (result: GetStateResult, content: string, contentType: string) => {
    const actualContent = await streamToString(result.content);
    assert.equal(actualContent, content);
    assert.equal(result.contentType, contentType);
    assert.equal(result.updatedAt.constructor, Date);
    assert.equal(result.etag.constructor, String);
  };

  it('should get when getting text', async () => {
    await createTextState();
    const agentStateResult = await getTestState();
    await assertGetState(agentStateResult, TEST_CONTENT, TEXT_CONTENT_TYPE);
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
    await createTextState({ agent: creationAgent });
    const agentStateResult = await getTestState({ agent: retrievalAgent });
    await assertGetState(agentStateResult, TEST_CONTENT, TEXT_CONTENT_TYPE);
  });

  it('should get when getting json', async () => {
    await createJsonState();
    const agentStateResult = await getTestState();
    await assertGetState(agentStateResult, TEST_JSON_CONTENT, JSON_CONTENT_TYPE);
  });

  it('should get when not using registration', async () => {
    await createTextState();
    const agentStateResult = await getTestState({
      registration: undefined,
    });
    await assertGetState(agentStateResult, TEST_CONTENT, TEXT_CONTENT_TYPE);
  });

  it('should error when getting existing model without a registration with one', async () => {
    await createTextState({ registration: undefined });
    const promise = getTestState();
    await assertError(NoModel, promise);
  });

  it('should get when using an mbox', async () => {
    await createTextState({ agent: TEST_MBOX_AGENT });
    const agentStateResult = await getTestState({ agent: TEST_MBOX_AGENT });
    await assertGetState(agentStateResult, TEST_CONTENT, TEXT_CONTENT_TYPE);
  });

  it('should get when using an mbox_sha1sum', async () => {
    await createTextState({ agent: TEST_MBOXSHA1_AGENT });
    const agentStateResult = await getTestState({ agent: TEST_MBOXSHA1_AGENT });
    await assertGetState(agentStateResult, TEST_CONTENT, TEXT_CONTENT_TYPE);
  });

  it('should get when using an openid', async () => {
    await createTextState({ agent: TEST_OPENID_AGENT });
    const agentStateResult = await getTestState({ agent: TEST_OPENID_AGENT });
    await assertGetState(agentStateResult, TEST_CONTENT, TEXT_CONTENT_TYPE);
  });

  it('should get when using an account', async () => {
    await createTextState({ agent: TEST_ACCOUNT_AGENT });
    const agentStateResult = await getTestState({ agent: TEST_ACCOUNT_AGENT });
    await assertGetState(agentStateResult, TEST_CONTENT, TEXT_CONTENT_TYPE);
  });
});
