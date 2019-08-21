import FacadeConfig from '../utils/memoryModels/FacadeConfig';
import Signature, { Opts } from './Signature';

export default (_config: FacadeConfig) => {
  return async () => {
    // no lrs in memory :)
    return;
  };
};
