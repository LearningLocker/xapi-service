import IdFormattedStatement from '../../../models/IdFormattedStatement';
import Statement from '../../../models/Statement';
import formatActor from './actor';
import formatStatementBase from './statementBase';
import formatStatementObject from './statementObject';

export default (statement: Statement): IdFormattedStatement => {
  return {
    ...statement,
    ...formatStatementBase(statement),
    authority: formatActor(statement.authority),
    object: formatStatementObject(statement.object),
  };
};
