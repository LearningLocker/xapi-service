import Activity from '../../../../../models/Activity';
import ActivityInteractionType from '../../../../../models/ActivityInteractionType';
import Agent from '../../../../../models/Agent';
import InteractionActivityDefinition from '../../../../../models/InteractionActivityDefinition';
import Statement from '../../../../../models/Statement';
import SubStatementObject from '../../../../../models/SubStatementObject';

const VERB_ID = 'http://example.org/test-verb';

const statementDefaults: Statement = {
  id: 'testvalue',
  authority: {
    objectType: 'Agent',
    mbox: 'mailto:authority@test.com',
  },
  stored: 'testvalue',
  timestamp: 'testvalue',
  version: 'testvalue',
  actor: {
    objectType: 'Agent',
    mbox: 'mailto:actor@test.com',
  } as Agent,
  verb: {
    id: VERB_ID,
  },
  object: {
    objectType: 'Activity',
    id: 'http://example.org/activity',
  } as Activity,
  result: {
    duration: 'P1Y2M3DT4H5M6S',
  },
};

const sequencingInteractionActivityStatement: Statement = {
  ...statementDefaults,
  ...{
    result: {
      response: 'tim[,]mike[,]ells[,]ben',
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

export {
  statementDefaults,
  sequencingInteractionActivityStatement,
};
