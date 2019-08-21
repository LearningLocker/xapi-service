import { get } from 'lodash';
import Statement from '../../../models/Statement';

export default (statement: Statement): string[] => {
  const registration = get(statement, ['context', 'registration'], undefined);
  if (registration === undefined) {
    return [];
  }
  return [registration];
};
