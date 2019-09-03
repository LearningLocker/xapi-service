import State from '../models/State';
import GetStatesOptions from '../repoFactory/options/GetStatesOptions';
import GetStatesResult from '../repoFactory/results/GetStatesResult';
import Config from './Config';
import isMatchingStates from './utils/isMatchingStates';

const matchStateSince = (state: State, since?: Date) => {
  return since === undefined ? true : state.updatedAt > since;
};

export default (config: Config) => {
  return async (opts: GetStatesOptions): Promise<GetStatesResult> => {
    const matchingStates = config.state.states.filter((state) => {
      return (
        isMatchingStates(state, opts) &&
        matchStateSince(state, opts.since)
      );
    });

    const stateIds = matchingStates.map((state) => {
      return state.stateId;
    });

    return { stateIds };
  };
};
