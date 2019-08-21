import Actor from './Actor';
import StatementBase from './StatementBase';

interface Statement extends StatementBase {
  id: string;
  authority: Actor;
  stored: string;
  timestamp: string;
  version: string;
}

export default Statement;
