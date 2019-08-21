import FullActivityModel from '../../../../models/FullActivityModel';
import StoredStatementModel from '../../../../models/StoredStatementModel';

export interface State {
  // tslint:disable-next-line:readonly-keyword
  fullActivities: FullActivityModel[];
  // tslint:disable-next-line:readonly-keyword
  statements: StoredStatementModel[];
}

export default interface FacadeConfig {
  readonly state: State;
}
