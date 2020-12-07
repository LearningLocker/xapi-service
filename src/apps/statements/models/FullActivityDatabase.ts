import FullActivity from './FullActivity';
import FullActivityContext from './FullActivityContext';

interface FullActivityDatabase extends FullActivity {
  readonly context?: FullActivityContext;
}

export default FullActivityDatabase;
