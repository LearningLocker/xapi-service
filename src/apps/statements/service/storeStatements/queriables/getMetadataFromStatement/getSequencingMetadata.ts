import { get, has, head } from 'lodash';

import ActivityInteractionType from '../../../../models/ActivityInteractionType';
import Statement from '../../../../models/Statement';

export const getSequencingMetadata = (statement: Statement)
  : {readonly [key: string]: any} => {
  if (
    !(
      get(
        statement.object,
        ['definition', 'interactionType'],
      ) === ActivityInteractionType.SEQUENCING
      && has(statement, ['result', 'response'])
    )
  ) {
    return {};
  }

  const choicesString = get(statement, ['result', 'response']);
  const choices = choicesString.split('[,]');

  /**
   * In case of there are no items after split e.g. "somestring.split('[,]') = ['somestring']".
   * And sequencing implies that we should have at least two items
   */
  if (head(choices) === get(statement, ['result', 'response'])) {
    return {};
  }

  return { 'https://learninglocker&46;net/sequencing-response': choices };
};
