import Activity from './Activity';
import InteractionActivityDefinition from './InteractionActivityDefinition';

interface InteractionActivity extends Activity {
  readonly definition: InteractionActivityDefinition;
}

export default InteractionActivity;
