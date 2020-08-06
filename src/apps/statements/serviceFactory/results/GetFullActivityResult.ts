import Context from '../../models/Context';
import Definition from '../../models/Definition';

interface GetFullActivityResult {
  readonly objectType: 'Activity';
  readonly id: string;
  readonly definition?: Definition;
  readonly context?: Context;
}

export default GetFullActivityResult;
