import Agent from './Agent';
import ContextActivities from './ContextActivities';
import Extensions from './Extensions';
import Group from './Group';

interface Context {
  readonly contextActivities?: ContextActivities;
  readonly team?: Group;
  readonly instructor?: Agent;
  readonly registration?: string;
  readonly extensions?: Extensions;
}

export default Context;
