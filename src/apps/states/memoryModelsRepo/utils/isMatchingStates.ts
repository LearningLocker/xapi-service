import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
import State from '../../models/State';
import isMatchingAgent from './isMatchingAgent';
import isMatchingRegistration from './isMatchingRegistration';

export interface Options {
  readonly activityId: string;
  readonly agent: Agent;
  readonly client: ClientModel;
  readonly registration?: string;
}

export default (state: State, opts: Options) => {
  return (
    state.activityId === opts.activityId &&
    isMatchingAgent(state.agent, opts.agent) &&
    isMatchingRegistration(state.registration, opts.registration) &&
    state.lrs === opts.client.lrs_id &&
    state.organisation === opts.client.organisation
  );
};
