import StatementObject from '../../../models/StatementObject';
import formatSubStatement from './subStatement';
import formatSubStatementObject from './subStatementObject';

export default (statementObject: StatementObject, langs: string[]): StatementObject => {
  switch (statementObject.objectType) {
    case 'SubStatement':
      return formatSubStatement(statementObject, langs);
    default:
      return formatSubStatementObject(statementObject, langs);
  }
};
