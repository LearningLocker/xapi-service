import Definition from './Definition';

interface Activity {
  objectType: 'Activity';
  id: string;
  definition?: Definition;
}

export default Activity;
