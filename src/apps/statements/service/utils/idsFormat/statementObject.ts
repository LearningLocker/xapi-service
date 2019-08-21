import IdFormattedStatementObject from '../../../models/IdFormattedStatementObject';
import StatementObject from '../../../models/StatementObject';
import formatSubStatement from './subStatement';
import formatSubStatementObject from './subStatementObject';

export default (statementObject: StatementObject): IdFormattedStatementObject => {
  switch (statementObject.objectType) {
    case 'SubStatement':
      return formatSubStatement(statementObject);
    default:
      return formatSubStatementObject(statementObject);
  }
};
