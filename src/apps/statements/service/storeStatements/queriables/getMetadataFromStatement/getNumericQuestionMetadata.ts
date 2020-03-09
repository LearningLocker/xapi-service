import { get, has } from 'lodash';

import ActivityInteractionType from '../../../../models/ActivityInteractionType';
import Statement from '../../../../models/Statement';

export const getNumericQuestionMetadata = (statement: Statement)
  : {readonly [key: string]: any} => {
  if (
    !(
      get(
        statement.object,
        ['definition', 'interactionType'],
      ) === ActivityInteractionType.NUMERIC
      && has(statement, ['result', 'response'])
    )
  ) {
    return {};
  }

  const numericQuestionString = get(statement, ['result', 'response']);

  if (!numericQuestionString.includes('[:]')) {
    return {'https://learninglocker&46;net/numeric-response': parseFloat(numericQuestionString)};
  }

  const [min, max] = numericQuestionString.split('[:]');
  return {
    'https://learninglocker&46;net/numeric-response': {
      min,
      max,
    },
  };
};
