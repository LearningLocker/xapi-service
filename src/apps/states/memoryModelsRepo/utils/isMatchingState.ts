import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
import State from '../../models/State';
import isMatchingStates from './isMatchingStates';

export interface Options {
  readonly activityId: string;
  readonly agent: Agent;
  readonly client: ClientModel;
  readonly registration?: string;
  readonly stateId: string;
}

export default (state: State, opts: Options) => {
  return (
    state.stateId === opts.stateId &&
    isMatchingStates(state, opts)
  );
};
