import Agent from '../models/Agent';
import GetFullAgentOptions from '../serviceFactory/options/GetFullAgentOptions';
import GetFullAgentResult from '../serviceFactory/results/GetFullAgentResult';
import Config from './Config';
import checkProfileReadScopes from './utils/checkProfileReadScopes';
import validateAgent from './utils/validateAgent';

const getCurrentFullAgent = (agent: Agent) => {
  return {
    account: agent.account === undefined ? [] : [agent.account],
    mbox: agent.mbox === undefined ? [] : [agent.mbox],
    mbox_sha1sum: agent.mbox_sha1sum === undefined ? [] : [agent.mbox_sha1sum],
    name: [],
    objectType: 'Person',
    openid: agent.openid === undefined ? [] : [agent.openid],
  };
};

export default (_config: Config) => {
  return async (opts: GetFullAgentOptions): Promise<GetFullAgentResult> => {
    checkProfileReadScopes(opts.client.scopes);
    validateAgent(opts.agent);
    return getCurrentFullAgent(opts.agent);
  };
};
