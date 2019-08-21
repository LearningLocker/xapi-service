import { includes } from 'lodash';
import FacadeConfig from '../utils/memoryModels/FacadeConfig';
import matchesClientOption from '../utils/memoryModels/matchesClientOption';
import Signature from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ client, ids }) => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        includes(ids, model.statement.id) &&
        matchesClientOption(model, client)
      );
    });
    const filteredStatements = filteredModels.map((model) => {
      return model.statement;
    });
    return filteredStatements;
  };
};
