import NoModel from 'jscommons/dist/errors/NoModel';
import Unauthorised from 'jscommons/dist/errors/Unauthorised';
import { isObject } from 'lodash';
import GetClientOptions from '../serviceFactory/options/GetClientOptions';
import GetClientResult from '../serviceFactory/results/GetClientResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetClientOptions): Promise<GetClientResult> => {
    try {
      return await config.repo.getClient(opts);
    } catch (err) {
      if (isObject(err) && err.constructor === NoModel) {
        throw new Unauthorised();
      }
      /* istanbul ignore next */
      throw err;
    }
  };
};
