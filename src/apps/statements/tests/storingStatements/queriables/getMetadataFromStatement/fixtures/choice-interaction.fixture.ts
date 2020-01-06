import { merge } from 'lodash';
import ActivityInteractionType from '../../../../../models/ActivityInteractionType';

import InteractionActivityDefinition from '../../../../../models/InteractionActivityDefinition';
import Statement from '../../../../../models/Statement';
import SubStatementObject from '../../../../../models/SubStatementObject';
import { statementDefaults } from './statements.fixture';

const singleChoice: Statement = {
  ...statementDefaults,
  ...{
    result: {
      success: true,
      duration: 'PT0H0M3S',
      response: 'golf',
    },
    object: {
      id: 'http://www.example.com/tincan/activities/uyheHUJd76s/question2',
      objectType: 'Activity',
      definition: {
        name: { 'en-US': 'Question 2' },
        description: { 'en-US': 'Which of these prototypes are available at the beta site?' },
        type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
        interactionType: ActivityInteractionType.CHOICE,
        correctResponsesPattern: ['golf[,]tetris'],
        choices: [
          { id: 'golf', description: { 'en-US': 'Golf Example' } },
          { id: 'facebook', description: { 'en-US': 'Facebook App' } },
          { id: 'tetris', description: { 'en-US': 'Tetris Example' } },
          { id: 'scrabble', description: { 'en-US': 'Scrabble Example' } },
        ],
      } as Partial<InteractionActivityDefinition>,
    } as SubStatementObject,
  } as Partial<Statement>,
};

const multipleChoices: Statement = merge(
  {},
  singleChoice,
  {
    result: {
      response: 'golf[,]tetris',
    },
  } as Partial<Statement>,
);

export {
  singleChoice,
  multipleChoices,
};
