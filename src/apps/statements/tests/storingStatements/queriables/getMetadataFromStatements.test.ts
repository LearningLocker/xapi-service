import assert from 'assert';
import { assign, merge } from 'lodash';

import Activity from '../../../models/Activity';
import Agent from '../../../models/Agent';
import InteractionActivityDefinition from '../../../models/InteractionActivityDefinition';
import Statement from '../../../models/Statement';
import SubStatementObject from '../../../models/SubStatementObject';
import getMetadataFromStatement
  from '../../../service/storeStatements/queriables/getMetadataFromStatement';

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

describe(
  'Retrieve metadata from statement',
  () => {
    it(
      'should return result duration statement',
      () => {
        const metadata = getMetadataFromStatement(statementDefaults);
        assert.deepEqual(metadata, {
          'https://learninglocker&46;net/result-duration': { seconds: 37080306 },
        });
      },
    );

    it(
      'should return choices with proper order(sequence)',
      () => {
        const interactionActivityStatementBase = merge(
          statementDefaults,
          {
            object: {
              definition: {
                name: { 'en-US': 'Question 6' },
                description: { 'en-US': 'Order players by their pong ladder position:' },
                type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
                interactionType: 'sequencing',
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
        );

        const interactionActivityStatement = assign(
          interactionActivityStatementBase,
          {
            result: {
              response: 'tim[,]mike[,]ells[,]ben',
            },
          },
        );

        assert.deepEqual(
          getMetadataFromStatement(interactionActivityStatement),
          {
            'https://learninglocker&46;net/sequencing-response': {
              sequence: [
                { id: 'tim', description: { 'en-US': 'Tim' } },
                { id: 'mike', description: { 'en-US': 'Mike' } },
                { id: 'ells', description: { 'en-US': 'Ells' } },
                { id: 'ben', description: { 'en-US': 'Ben' } },
              ],
            },
          });
      },
    );
  },
);
