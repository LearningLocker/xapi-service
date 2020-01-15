import { get, has } from 'lodash';

import ActivityInteractionType from '../../../../models/ActivityInteractionType';
import Statement from '../../../../models/Statement';

export const getBooleanMetadata = (statement: Statement)
  : {readonly [key: string]: any} => {
  if (
    !(
      get(
        statement.object,
        ['definition', 'interactionType'],
      ) === ActivityInteractionType.TRUE_FALSE
      && has(statement, ['result', 'response'])
    )
  ) {
    return {};
  }

  const response = get(statement, ['result', 'response']);

  return { 'https://learninglocker.net/true-false-response': response };
};
