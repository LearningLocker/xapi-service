import { includes } from 'lodash';
import Statement from '../../../models/Statement';
import FacadeConfig from '../utils/memoryModels/FacadeConfig';
import matchesClientOption from '../utils/memoryModels/matchesClientOption';
import Signature, { Opts } from './Signature';

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
