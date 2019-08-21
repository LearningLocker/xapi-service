import StoredStatementModel from '../../../../models/StoredStatementModel';
import getActorIdent from '../../../../utils/getActorIdent';
import { Opts } from '../Signature';

export default (model: StoredStatementModel, opts: Opts): boolean => {
  if (opts.agent === undefined) {
    return true;
  }
  const agentIdent = getActorIdent(opts.agent);
  if (opts.related_agents === true) {
    return model.relatedAgents.indexOf(agentIdent) > -1;
  }
  return model.agents.indexOf(agentIdent) > -1;
};
