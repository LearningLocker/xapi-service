import { get, has } from 'lodash';
import Statement from '../../../models/Statement';

export default (statement: Statement): string[] => {
  return [statement.verb.id];
};
