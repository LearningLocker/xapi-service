import NoModel from 'jscommons/dist/errors/NoModel';
import ChangedStatementRef from '../../../errors/ChangedStatementRef';
import FacadeConfig from '../utils/memoryModels/FacadeConfig';
import matchesClientOption from '../utils/memoryModels/matchesClientOption';
import Signature from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ client, id }) => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        model.statement.object.objectType === 'StatementRef' &&
        model.statement.id === id &&
        matchesClientOption(model, client)
      );
    });
    if (filteredModels.length === 0) {
      throw new NoModel('Statement');
    }
    const statementObject = filteredModels[0].statement.object;
    if (statementObject.objectType === 'StatementRef') {
      return statementObject.id;
    }

    /* istanbul ignore next */
    throw new ChangedStatementRef(id);
  };
};
