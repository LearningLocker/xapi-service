import ContextActivities from '../../models/ContextActivities';
import Definition from '../../models/Definition';

interface GetFullActivityResult {
  readonly objectType: 'Activity';
  readonly id: string;
  readonly definition?: Definition;
  readonly contextActivities?: ContextActivities;
}

export default GetFullActivityResult;
