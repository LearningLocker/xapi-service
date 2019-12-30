import { get, has } from 'lodash';
import * as moment from 'moment';

import Statement from '../../../../models/Statement';

export const getDurationMetadata = (statement: Statement)
  : {readonly [key: string]: any} | false => {
  if (!has(statement, ['result', 'duration'])) {
    return false;
  }

  const duration = get(statement, ['result', 'duration']);
  const seconds = moment.duration(duration).as('seconds');

  return { 'https://learninglocker&46;net/result-duration': { seconds } };
};
