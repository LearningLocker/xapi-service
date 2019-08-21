import IdFormattedSubStatement from '../../../models/IdFormattedSubStatement';
import SubStatement from '../../../models/SubStatement';
import formatStatementBase from './statementBase';
import formatSubStatementObject from './subStatementObject';

export default (statement: SubStatement): IdFormattedSubStatement => {
  return {
    ...statement,
    ...formatStatementBase(statement),
    object: formatSubStatementObject(statement.object),
  };
};
