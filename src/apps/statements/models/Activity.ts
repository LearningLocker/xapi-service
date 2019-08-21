import Definition from './Definition';

interface Activity {
  readonly objectType: 'Activity';
  readonly id: string;
  readonly definition?: Definition;
}

export default Activity;
