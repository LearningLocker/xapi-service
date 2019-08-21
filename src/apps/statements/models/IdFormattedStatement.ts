import IdFormattedActor from './IdFormattedActor';
import IdFormattedStatementBase from './IdFormattedStatementBase';

interface IdFormattedStatement extends IdFormattedStatementBase {
  id: string;
  authority: IdFormattedActor;
  stored: string;
  timestamp: string;
  version: string;
}

export default IdFormattedStatement;
