import Activity from './Activity';

interface ContextActivities {
  readonly parent?: Activity[];
  readonly grouping?: Activity[];
  readonly category?: Activity[];
  readonly other?: Activity[];
}

export default ContextActivities;
