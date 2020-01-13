import { get, has } from 'lodash';

import ActivityInteractionType from '../../../../models/ActivityInteractionType';
import Statement from '../../../../models/Statement';

export const getMatchingQuestionsMetadata = (statement: Statement)
  : {readonly [key: string]: any} => {
  if (
    !(
      get(
        statement.object,
        ['definition', 'interactionType'],
      ) === ActivityInteractionType.MATCHING
      && has(statement, ['result', 'response'])
    )
  ) {
    return {};
  }

  const matchingQuestionsString = get(statement, ['result', 'response']);
  const matchingQuestions = matchingQuestionsString
    .split('[,]')
    .map((mq: string) => mq.split('[.]'));

  return { 'https://learninglocker&46;net/matching-response': matchingQuestions };
};
