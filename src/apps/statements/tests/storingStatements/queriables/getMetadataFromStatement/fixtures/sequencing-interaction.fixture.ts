import { merge } from 'lodash';

import ActivityInteractionType from '../../../../../models/ActivityInteractionType';
import InteractionActivityDefinition from '../../../../../models/InteractionActivityDefinition';
import Statement from '../../../../../models/Statement';
import SubStatementObject from '../../../../../models/SubStatementObject';
import { statementDefaults } from './statements.fixture';

const singleItemSequence: Statement = {
  ...statementDefaults,
  ...{
    result: {
      response: 'tim',
    },
    object: {
      definition: {
        name: { 'en-US': 'Question 6' },
        description: { 'en-US': 'Order players by their pong ladder position:' },
        type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
        interactionType: ActivityInteractionType.SEQUENCING,
        correctResponsesPattern: ['tim[,]mike[,]ells[,]ben'],
        choices: [
          { id: 'tim', description: { 'en-US': 'Tim' } },
          { id: 'ben', description: { 'en-US': 'Ben' } },
          { id: 'ells', description: { 'en-US': 'Ells' } },
          { id: 'mike', description: { 'en-US': 'Mike' } },
        ],
      } as Partial<InteractionActivityDefinition>,
    } as SubStatementObject,
  } as Partial<Statement>,
};

const multipleItemsSequence = merge(
  {},
  singleItemSequence,
  {
    result: {
      response: 'tim[,]mike[,]ells[,]ben',
    },
  } as Partial<Statement>,
);

export {
  singleItemSequence,
  multipleItemsSequence,
};
