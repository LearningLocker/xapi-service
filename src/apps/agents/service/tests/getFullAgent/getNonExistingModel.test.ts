import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import Account from '../../../models/Account';
import GetFullAgentResult from '../../../serviceFactory/results/GetFullAgentResult';
import {
  TEST_ACCOUNT_AGENT,
  TEST_INVALID_AGENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import getFullAgent from './utils/getFullAgent';

describe('getFullAgent with non-existing model', () => {
  setup();

  const assertFullAgent = async (agent: any, resultOverrides: Partial<GetFullAgentResult>) => {
    const expectedResult: GetFullAgentResult = {
      account: [],
      mbox: [],
      mbox_sha1sum: [],
      name: [],
      objectType: 'Person',
      openid: [],
      ...resultOverrides,
    };
    const fullAgent = await getFullAgent({ agent });
    assert.deepEqual(fullAgent, expectedResult);
  };

  it('should return the agent when using mbox', async () => {
    await assertFullAgent(TEST_MBOX_AGENT, {
      mbox: [TEST_MBOX_AGENT.mbox as string],
    });
  });

  it('should return the agent when using mbox_sha1sum', async () => {
    await assertFullAgent(TEST_MBOXSHA1_AGENT, {
      mbox_sha1sum: [TEST_MBOXSHA1_AGENT.mbox_sha1sum as string],
    });
  });

  it('should return the agent when using openid', async () => {
    await assertFullAgent(TEST_OPENID_AGENT, {
      openid: [TEST_OPENID_AGENT.openid as string],
    });
  });

  it('should return the agent when using account', async () => {
    await assertFullAgent(TEST_ACCOUNT_AGENT, {
      account: [TEST_ACCOUNT_AGENT.account as Account],
    });
  });

  it('should throw warnings when using an invalid agent', async () => {
    const promise = getFullAgent({ agent: TEST_INVALID_AGENT });
    await assertError(Warnings, promise);
  });
});
