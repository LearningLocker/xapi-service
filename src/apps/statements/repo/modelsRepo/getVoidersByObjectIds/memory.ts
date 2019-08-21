import { includes } from 'lodash';
import ChangedStatementRef from '../../../errors/ChangedStatementRef';
import Statement from '../../../models/Statement';
import voidVerbId from '../../../utils/voidVerbId';
import getStatements from '../utils/memoryModels//getStatements';
import FacadeConfig from '../utils/memoryModels/FacadeConfig';
import Signature, { Opts } from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ client, ids }) => {
    const query = (statement: Statement) => {
      return (
        statement.verb.id === voidVerbId &&
        statement.object.objectType === 'StatementRef' &&
        includes(ids, statement.object.id)
      );
    };
    const project = (statement: Statement): string => {
      if (statement.object.objectType === 'StatementRef') {
        return statement.object.id;
      }

      /* istanbul ignore next */
      throw new ChangedStatementRef(statement.id);
    };
    return getStatements({ config, query, project, client });
  };
};
