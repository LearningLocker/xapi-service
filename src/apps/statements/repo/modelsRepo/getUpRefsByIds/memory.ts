import { includes } from 'lodash';
import ChangedStatementRef from '../../../errors/ChangedStatementRef';
import StoredStatementModel from '../../../models/StoredStatementModel';
import FacadeConfig from '../utils/memoryModels/FacadeConfig';
import matchesClientOption from '../utils/memoryModels/matchesClientOption';
import Signature from './Signature';

const getTargetId = (model: StoredStatementModel) => {
  if (model.statement.object.objectType === 'StatementRef') {
    return model.statement.object.id;
  }

  /* istanbul ignore next */
  throw new ChangedStatementRef(model.statement.id);
};

export default (config: FacadeConfig): Signature => {
  return async ({ client, targetIds }) => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        model.statement.object.objectType === 'StatementRef' &&
        includes(targetIds, model.statement.object.id) &&
        matchesClientOption(model, client)
      );
    });
    return filteredModels.map((model) => {
      const sourceId = model.statement.id;
      const targetId = getTargetId(model);
      return { sourceId, targetId };
    });
  };
};
