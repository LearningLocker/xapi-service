import IdFormattedStatementBase from './IdFormattedStatementBase';
import IdFormattedSubStatementObject from './IdFormattedSubStatementObject';

interface IdFormattedSubStatement extends IdFormattedStatementBase {
  readonly objectType: 'SubStatement';
  readonly object: IdFormattedSubStatementObject;
}

export default IdFormattedSubStatement;
