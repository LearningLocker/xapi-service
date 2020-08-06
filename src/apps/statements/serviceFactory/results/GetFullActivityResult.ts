import Definition from '../../models/Definition';
import FullActivityContext from '../../models/FullActivityContext';

interface GetFullActivityResult {
  readonly objectType: 'Activity';
  readonly id: string;
  readonly definition?: Definition;
  readonly context?: FullActivityContext;
}

export default GetFullActivityResult;
