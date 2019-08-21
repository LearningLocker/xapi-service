import { v1 as uuid } from 'uuid';
import FacadeConfig from '../utils/memoryModels/FacadeConfig';
import Signature from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ models }) => {
    const idModels = models.map((model) => {
      return { ...model, _id: uuid() };
    });
    config.state.statements = config.state.statements.concat(idModels);
    return models;
  };
};
