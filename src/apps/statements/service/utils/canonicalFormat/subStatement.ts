import SubStatement from '../../../models/SubStatement';
import formatStatementBase from './statementBase';
import formatSubStatementObject from './subStatementObject';

export default (statement: SubStatement, langs: string[]): SubStatement => {
  return {
    ...statement,
    ...formatStatementBase(statement, langs),
    object: formatSubStatementObject(statement.object, langs),
  };
};
