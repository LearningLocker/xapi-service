import IdFormattedStatementBase from './IdFormattedStatementBase';
import IdFormattedSubStatementObject from './IdFormattedSubStatementObject';

interface IdFormattedSubStatement extends IdFormattedStatementBase {
  objectType: 'SubStatement';
  object: IdFormattedSubStatementObject;
}

export default IdFormattedSubStatement;
