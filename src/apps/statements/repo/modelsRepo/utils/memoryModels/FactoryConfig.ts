import { State } from './FacadeConfig';

export default interface FactoryConfig {
  readonly state?: Partial<State>;
}
