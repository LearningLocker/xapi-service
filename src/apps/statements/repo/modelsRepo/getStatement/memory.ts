import NoModel from 'jscommons/dist/errors/NoModel';
import FacadeConfig from '../utils/memoryModels/FacadeConfig';
import matchesClientOption from '../utils/memoryModels/matchesClientOption';
import Signature from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ client, id, voided }) => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        model.statement.id === id &&
        matchesClientOption(model, client, true) &&
        model.voided === voided
      );
    });
    if (filteredModels.length === 0) {
      throw new NoModel('Statement');
    }
    return filteredModels[0];
  };
};
