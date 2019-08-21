import Definition from '../../models/Definition';

interface GetFullActivityResult {
  readonly objectType: 'Activity';
  readonly id: string;
  readonly definition?: Definition;
}

export default GetFullActivityResult;
