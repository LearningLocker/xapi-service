import commonMemoryRepo from 'jscommons/dist/memoryRepo';
import ModelsRepo from '../repoFactory/ModelsRepo';
import Config from './Config';
import deleteState from './deleteState';
import deleteStates from './deleteStates';
import getState from './getState';
import getStates from './getStates';
import overwriteState from './overwriteState';
import patchState from './patchState';

export default (config: Config): ModelsRepo => {
  return {
    deleteState: deleteState(config),
    deleteStates: deleteStates(config),
    getState: getState(config),
    getStates: getStates(config),
    overwriteState: overwriteState(config),
    patchState: patchState(config),
    ...commonMemoryRepo(config),
  };
};
