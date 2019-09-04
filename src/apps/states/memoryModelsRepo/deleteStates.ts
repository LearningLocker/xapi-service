import DeleteStatesOptions from '../repoFactory/options/DeleteStatesOptions';
import DeleteStatesResult from '../repoFactory/results/DeleteStatesResult';
import Config from './Config';
import isMatchingStates from './utils/isMatchingStates';

export default (config: Config) => {
  return async (opts: DeleteStatesOptions): Promise<DeleteStatesResult> => {
    const storedStates = config.state.states;
    const remainingStates = storedStates.filter((state) => {
      return !isMatchingStates(state, opts);
    });
    const matchingStates = storedStates.filter((state) => {
      return isMatchingStates(state, opts);
    });

    const deletedStates = matchingStates.map((state) => {
      return {
        content: state.content,
        extension: state.extension,
        id: state.id,
      };
    });
    config.state.states = remainingStates;
    return { states: deletedStates };
  };
};
