import ActivityInteractionType from '../../../../../models/ActivityInteractionType';
import InteractionActivityDefinition from '../../../../../models/InteractionActivityDefinition';
import Statement from '../../../../../models/Statement';
import SubStatementObject from '../../../../../models/SubStatementObject';
import { statementDefaults } from './statements.fixture';

const booleanInteractionActivityStatement: Statement = {
  ...statementDefaults,
  ...{
    result: {
      response: 'true',
    },
    object: {
      definition: {
        name: {'en-US': 'Question 1'},
        description: {'en-US': 'Does the TCAPI include the concept of statements?'},
        type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
        interactionType: ActivityInteractionType.TRUE_FALSE,
        correctResponsesPattern: ['true'],
      } as Partial<InteractionActivityDefinition>,
    } as SubStatementObject,
  } as Partial<Statement>,
};

export {
  booleanInteractionActivityStatement,
};
