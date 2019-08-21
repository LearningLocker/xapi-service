import { includes } from 'lodash';
import StatementHash from '../../../models/StatementHash';
import StoredStatementModel from '../../../models/StoredStatementModel';
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
    return filteredModels.map((model: StoredStatementModel): StatementHash => {
      return {
        statementId: model.statement.id,
        hash: model.hash,
      };
    });
  };
};
