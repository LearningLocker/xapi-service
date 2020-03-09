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
        scale: [
          {id: 'likert_0', description: {'en-US': 'It’s OK'}},
          {id: 'likert_1', description: {'en-US': 'It’s Pretty Cool'}},
          {id: 'likert_2', description: {'en-US': 'It’s Damn Cool'}},
          {id: 'likert_3', description: {'en-US': 'It’s Gonna Change the World'}},
        ],
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
