import StatementBase from './StatementBase';
import SubStatementObject from './SubStatementObject';

interface SubStatement extends StatementBase {
  readonly objectType: 'SubStatement';
  readonly object: SubStatementObject;
}

export default SubStatement;
