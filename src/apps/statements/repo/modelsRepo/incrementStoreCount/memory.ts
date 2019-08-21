import FacadeConfig from '../utils/memoryModels/FacadeConfig';

export default (_config: FacadeConfig) => {
  return async () => {
    // no lrs in memory :)
    return;
  };
};
