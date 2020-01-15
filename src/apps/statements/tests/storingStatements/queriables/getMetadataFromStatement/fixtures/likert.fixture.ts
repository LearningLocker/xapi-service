import ActivityInteractionType from '../../../../../models/ActivityInteractionType';
import InteractionActivityDefinition from '../../../../../models/InteractionActivityDefinition';
import Statement from '../../../../../models/Statement';
import SubStatementObject from '../../../../../models/SubStatementObject';
import { statementDefaults } from './statements.fixture';

const likertStatement: Statement = {
  ...statementDefaults,
  ...{
    result: {
      response: 'likert_3',
    },
    object: {
      definition: {
        name: {'en-US': 'Question 3'},
        description: {'en-US': 'How awesome is xAPI?'},
        type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
        interactionType: ActivityInteractionType.LIKERT,
        correctResponsesPattern: ['likert_3'],
      } as Partial<InteractionActivityDefinition>,
    } as SubStatementObject,
  } as Partial<Statement>,
};

export {
    likertStatement,
};
