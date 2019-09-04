import NoModel from 'jscommons/dist/errors/NoModel';
import GetStateOptions from '../repoFactory/options/GetStateOptions';
import GetStateResult from '../repoFactory/results/GetStateResult';
import Config from './Config';
import isMatchingState from './utils/isMatchingState';

export default (config: Config) => {
  return async (opts: GetStateOptions): Promise<GetStateResult> => {
    const matchingStates = config.state.states.filter((state) => {
      return isMatchingState(state, opts);
    });

    const isExistingIfi = matchingStates.length !== 0;
    if (!isExistingIfi) {
      throw new NoModel('State');
    }

    const { id, content, contentType, updatedAt, etag, extension } = matchingStates[0];
    return { id, content, contentType, updatedAt, etag, extension };
  };
};
