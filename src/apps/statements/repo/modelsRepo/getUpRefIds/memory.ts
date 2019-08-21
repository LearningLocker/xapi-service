import FacadeConfig from '../utils/memoryModels/FacadeConfig';
import matchesClientOption from '../utils/memoryModels/matchesClientOption';
import Signature from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ client, id }) => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        model.statement.object.objectType === 'StatementRef' &&
        model.statement.object.id === id &&
        matchesClientOption(model, client)
      );
    });
    return filteredModels.map((model) => {
      return model.statement.id;
    });
  };
};
