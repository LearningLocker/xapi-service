import ActivityInteractionType from '../../../../../models/ActivityInteractionType';
import InteractionActivityDefinition from '../../../../../models/InteractionActivityDefinition';
import Statement from '../../../../../models/Statement';
import SubStatementObject from '../../../../../models/SubStatementObject';
import { statementDefaults } from './statements.fixture';

const numericQuestionInteractionActivityStatement: Statement = {
  ...statementDefaults,
  ...{
    result: {
      response: '4:',
    },
    object: {
      definition: {
        name: {'en-US': 'Question 7'},
        description: {'en-US': 'How many jokes is Chris the butt of each day?'},
        type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
        interactionType: ActivityInteractionType.NUMERIC,
        correctResponsesPattern: ['4:'],
      } as Partial<InteractionActivityDefinition>,
    } as SubStatementObject,
  } as Partial<Statement>,
};

const numericQuestionWithMinAndMaxInteractionActivityStatement: Statement = {
  ...statementDefaults,
  ...{
    result: {
      response: '4[:]5',
    },
    object: {
      definition: {
        name: {'en-US': 'Question 7'},
        description: {'en-US': 'How many jokes is Chris the butt of each day?'},
        type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
        interactionType: ActivityInteractionType.NUMERIC,
        correctResponsesPattern: ['4[:]5'],
      } as Partial<InteractionActivityDefinition>,
    } as SubStatementObject,
  } as Partial<Statement>,
};

export {
  numericQuestionInteractionActivityStatement,
  numericQuestionWithMinAndMaxInteractionActivityStatement,
};
