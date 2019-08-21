import Activity from './Activity';

interface ContextActivities {
  parent?: Activity[];
  grouping?: Activity[];
  category?: Activity[];
  other?: Activity[];
}

export default ContextActivities;
