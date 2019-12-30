import { get, has, head } from 'lodash';
import * as moment from 'moment';

import ActivityInteractionComponent from '../../../models/ActivityInteractionComponent';
import Statement from '../../../models/Statement';

export default (statement: Statement): {readonly [key: string]: any} => {
  if (has(statement, ['result', 'duration'])) {
    const duration = get(statement, ['result', 'duration']);
    const seconds = moment.duration(duration).as('seconds');
    return { 'https://learninglocker&46;net/result-duration': { seconds } };
  }

  if (
    get(statement.object, ['definition', 'interactionType']) === 'sequencing'
    && has(statement.object, ['definition', 'choices'])
    && has(statement, ['result', 'response'])
  ) {
    const choicesString = get(statement, ['result', 'response']);
    const choices = choicesString.split('[,]');

    /**
     * In case of there are no items after split e.g. "somestring.split('[,]') = ['somestring']".
     * And sequencing implies that we should have at least two items
     */
    if (head(choices) === get(statement, ['result', 'response'])) {
      return {};
    }

    const sequence = choices
      .map(
        (choice: string) => get(statement.object, ['definition', 'choices'])
          .find(
            (interactionComponent: ActivityInteractionComponent) =>
              interactionComponent.id === choice,
          ),
      )
      .filter((interactionComponent: ActivityInteractionComponent) => !!interactionComponent);

    if (sequence.length === 0) {
      return {};
    }

    return {
      'https://learninglocker&46;net/sequencing-response': { sequence },
    };
  }

  return {};
};
