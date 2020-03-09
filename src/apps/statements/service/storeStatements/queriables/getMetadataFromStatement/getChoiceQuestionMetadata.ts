import { get, has } from 'lodash';

import ActivityInteractionType from '../../../../models/ActivityInteractionType';

import Statement from '../../../../models/Statement';

export const getChoiceQuestionMetadata = (statement: Statement)
  : {readonly [key: string]: any} => {
  if (
    !(
      get(statement.object, ['definition', 'interactionType']) === ActivityInteractionType.CHOICE
      && has(statement, ['result', 'response'])
    )
  ) {
    return {};
  }

  const choicesString = get(statement, ['result', 'response']);
  const choices = choicesString.split('[,]');

  return { 'https://learninglocker&46;net/choice-response': choices };
};
