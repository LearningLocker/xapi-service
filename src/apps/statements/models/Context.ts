import Agent from './Agent';
import ContextActivities from './ContextActivities';
import Extensions from './Extensions';
import Group from './Group';

interface Context {
  contextActivities?: ContextActivities;
  team?: Group;
  instructor?: Agent;
  registration?: string;
  extensions?: Extensions;
}

export default Context;
