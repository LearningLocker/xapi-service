import commonService from 'jscommons/dist/service';
import Service from '../serviceFactory/Service';
import Config from './Config';
import deleteState from './deleteState';
import deleteStates from './deleteStates';
import getClient from './getClient';
import getState from './getState';
import getStates from './getStates';
import overwriteState from './overwriteState';
import patchState from './patchState';

export default (config: Config): Service => {
  return {
    ...commonService(config),
    deleteState: deleteState(config),
    deleteStates: deleteStates(config),
    getClient: getClient(config),
    getState: getState(config),
    getStates: getStates(config),
    overwriteState: overwriteState(config),
    patchState: patchState(config),
  };
};
