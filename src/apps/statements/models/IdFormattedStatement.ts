import IdFormattedActor from './IdFormattedActor';
import IdFormattedStatementBase from './IdFormattedStatementBase';

interface IdFormattedStatement extends IdFormattedStatementBase {
  readonly id: string;
  readonly authority: IdFormattedActor;
  readonly stored: string;
  readonly timestamp: string;
  readonly version: string;
}

export default IdFormattedStatement;
