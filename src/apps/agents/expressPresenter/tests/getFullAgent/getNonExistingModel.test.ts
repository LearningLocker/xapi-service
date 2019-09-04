import { BAD_REQUEST, OK } from 'http-status-codes';
import Account from '../../../models/Account';
import GetFullAgentResult from '../../../serviceFactory/results/GetFullAgentResult';
import { route, xapiHeaderVersion } from '../../../utils/constants';
import {
  TEST_ACCOUNT_AGENT,
  TEST_INVALID_AGENT,
  TEST_INVALID_JSON_CONTENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import getFullAgent from './utils/getFullAgent';

describe('expressPresenter.getFullAgent with non-existing model', () => {
  const { supertest } = setup();

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
    await getFullAgent(agent).expect(OK, expectedResult);
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
    await getFullAgent(TEST_INVALID_AGENT).expect(BAD_REQUEST);
  });

  it('should throw warnings when using invalid json in agent', async () => {
    await supertest
      .get(route)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .query({
        agent: TEST_INVALID_JSON_CONTENT,
      })
      .expect(BAD_REQUEST);
  });
});
