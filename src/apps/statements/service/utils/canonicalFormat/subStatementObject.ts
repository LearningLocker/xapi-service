import SubStatementObject from '../../../models/SubStatementObject';
import formatActivity from './activity';

export default (statementObject: SubStatementObject, langs: string[]): SubStatementObject => {
  switch (statementObject.objectType) {
    case 'Agent':
    case 'Group':
    case 'StatementRef':
      return statementObject;
    case 'Activity':
    default:
      return formatActivity(statementObject, langs);
  }
};
