import NoModel from 'jscommons/dist/errors/NoModel';
import DeleteStateOptions from '../repoFactory/options/DeleteStateOptions';
import DeleteStateResult from '../repoFactory/results/DeleteStateResult';
import Config from './Config';
import isMatchingState from './utils/isMatchingState';

export default (config: Config) => {
  return async (opts: DeleteStateOptions): Promise<DeleteStateResult> => {
    const storedStates = config.state.states;
    const remainingStates = storedStates.filter((state) => {
      return !isMatchingState(state, opts);
    });
    const matchingStates = storedStates.filter((state) => {
      return isMatchingState(state, opts);
    });

    if (matchingStates.length > 0) {
      const existingState = matchingStates[0];
      config.state.states = remainingStates;
      return {
        content: existingState.content,
        extension: existingState.extension,
        id: existingState.id,
      };
    }

    throw new NoModel('State');
  };
};
