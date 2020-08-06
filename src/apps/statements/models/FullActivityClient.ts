import Context from './Context';
import FullActivity from './FullActivity';

interface FullActivityClient extends FullActivity {
  readonly context?: Context;
}

export default FullActivityClient;
