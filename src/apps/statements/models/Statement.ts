import Actor from './Actor';
import StatementBase from './StatementBase';

interface Statement extends StatementBase {
  readonly id: string;
  readonly authority: Actor;
  readonly stored: string;
  readonly timestamp: string;
  readonly version: string;
}

export default Statement;
