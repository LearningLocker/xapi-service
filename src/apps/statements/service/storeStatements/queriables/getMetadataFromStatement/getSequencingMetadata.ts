import { get, has, head } from 'lodash';

import Statement from '../../../../models/Statement';

export const getSequencingMetadata = (statement: Statement)
  : {readonly [key: string]: any} | false => {
  if (
    !(
      get(statement.object, ['definition', 'interactionType']) === 'sequencing'
      && has(statement, ['result', 'response'])
    )
  ) {
    return false;
  }

  const choicesString = get(statement, ['result', 'response']);
  const choices = choicesString.split('[,]');

  /**
   * In case of there are no items after split e.g. "somestring.split('[,]') = ['somestring']".
   * And sequencing implies that we should have at least two items
   */
  if (head(choices) === get(statement, ['result', 'response'])) {
    return false;
  }

  return { 'https://learninglocker&46;net/sequencing-response': choices };
};
