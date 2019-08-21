import { get, has } from 'lodash';
import * as moment from 'moment';
import Statement from '../../../models/Statement';

export default (statement: Statement): { readonly [key: string]: any } => {
  if (has(statement, ['result', 'duration'])) {
    const duration = get(statement, ['result', 'duration']);
    const seconds = moment.duration(duration).as('seconds');
    return { 'https://learninglocker&46;net/result-duration': { seconds } };
  }
  return {};
};
