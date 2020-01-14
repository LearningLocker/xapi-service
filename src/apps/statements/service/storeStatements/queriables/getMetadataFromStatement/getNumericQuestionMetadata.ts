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
  const numericQuestion = parseFloat(numericQuestionString);

  return { 'https://learninglocker.net/numeric-response': numericQuestion };
};
