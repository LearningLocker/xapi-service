import Statement from '../../../models/Statement';
import formatStatementBase from './statementBase';
import formatStatementObject from './statementObject';

export default (statement: Statement, langs: string[]): Statement => {
  return {
    ...statement,
    ...formatStatementBase(statement, langs),
    object: formatStatementObject(statement.object, langs),
  };
};
