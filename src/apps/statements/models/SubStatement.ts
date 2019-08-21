import StatementBase from './StatementBase';
import SubStatementObject from './SubStatementObject';

interface SubStatement extends StatementBase {
  objectType: 'SubStatement';
  object: SubStatementObject;
}

export default SubStatement;
