import IdFormattedSubStatementObject from '../../../models/IdFormattedSubStatementObject';
import SubStatementObject from '../../../models/SubStatementObject';
import formatActivity from './activity';
import formatActor from './actor';

export default (statementObject: SubStatementObject): IdFormattedSubStatementObject => {
  switch (statementObject.objectType) {
    case 'Agent':
    case 'Group':
      return formatActor(statementObject);
    case 'StatementRef':
      return statementObject;
    case 'Activity':
    default:
      return formatActivity(statementObject);
  }
};
