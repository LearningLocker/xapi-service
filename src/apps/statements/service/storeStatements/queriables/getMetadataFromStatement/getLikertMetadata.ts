import { get, has } from 'lodash';

import ActivityInteractionType from '../../../../models/ActivityInteractionType';
import Statement from '../../../../models/Statement';

export const getLikertMetadata = (statement: Statement)
: {readonly [key: string]: any} => {
    if (
      !(
        get(
          statement.object,
          ['definition', 'interactionType'],
        ) === ActivityInteractionType.LIKERT
        && has(statement, ['result', 'response'])
      )
    ) {
      return {};
    }

  const likert = get(statement, ['result', 'response']);

  return { 'https://learninglocker&46;net/likert-response': { likert } };
};
