import { includes } from 'lodash';
import Statement from '../../../models/Statement';
import voidVerbId from '../../../utils/voidVerbId';
import FacadeConfig from '../utils/memoryModels/FacadeConfig';
import getStatements from '../utils/memoryModels/getStatements';
import Signature from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ client, ids }) => {
    // istanbul ignore next - this is checked higher in the code.
    if (ids.length === 0) {
      return [];
    }
    const query = (statement: Statement) => {
      return (
        statement.verb.id === voidVerbId &&
        statement.object.objectType === 'StatementRef' &&
        includes(ids, statement.id)
      );
    };
    const project = (statement: Statement): string => {
      return statement.id;
    };
    return getStatements({ config, query, project, client });
  };
};
