import OverwriteStateOptions from '../repoFactory/options/OverwriteStateOptions';
import OverwriteStateResult from '../repoFactory/results/OverwriteStateResult';
import Config from './Config';
import createState from './utils/createState';
import isMatchingState from './utils/isMatchingState';

export default (config: Config) => {
  return async (opts: OverwriteStateOptions): Promise<OverwriteStateResult> => {
    const storedStates = config.state.states;
    const matchingStates = storedStates.filter((state) => {
      return isMatchingState(state, opts);
    });

    // Updates the state if it does exist, otherwise it creates the state.
    if (matchingStates.length > 0) {
      const update = {
        content: opts.content,
        contentType: opts.contentType,
        etag: opts.etag,
        extension: opts.extension,
        updatedAt: new Date(),
      };
      const updatedStates = storedStates.map((state) => {
        if (!isMatchingState(state, opts)) {
          return state;
        }
        return { ...state, ...update };
      });
      config.state.states = updatedStates;
      return { id: matchingStates[0].id, extension: matchingStates[0].extension };
    } else {
      const createdState = createState(config, opts);
      return { id: createdState.id, extension: createdState.extension };
    }
  };
};
