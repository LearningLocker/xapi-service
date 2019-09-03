import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
import getStatesFilter from './getStatesFilter';

export interface Options {
  readonly activityId: string;
  readonly agent: Agent;
  readonly client: ClientModel;
  readonly registration?: string;
  readonly stateId: string;
}

export default (opts: Options) => {
  return {
    stateId: opts.stateId,
    ...getStatesFilter(opts),
  };
};
