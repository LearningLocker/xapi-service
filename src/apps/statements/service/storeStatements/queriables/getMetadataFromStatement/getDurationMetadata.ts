import { get, has } from 'lodash';
import { duration } from 'moment';

import Statement from '../../../../models/Statement';

export const getDurationMetadata = (statement: Statement): { readonly [key: string]: any } => {
  if (!has(statement, ['result', 'duration'])) {
    return {};
  }

  const resultDuration = get(statement, ['result', 'duration']);
  const seconds = duration(resultDuration).as('seconds');

  return { 'https://learninglocker&46;net/result-duration': { seconds } };
};
