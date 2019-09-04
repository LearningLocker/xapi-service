import { createRequiredWarning, Warnings } from 'rulr';
import Agent from '../../models/Agent';
import parseJSON from '../../utils/parseJSON';

export default (agentParam: string|undefined): Agent => {
  if (agentParam === undefined) {
    const warnings = [createRequiredWarning(agentParam, ['query', 'agent'])];
    throw new Warnings({}, ['query'], warnings);
  }

  return parseJSON(agentParam, ['query', 'agent']) as Agent;
};
