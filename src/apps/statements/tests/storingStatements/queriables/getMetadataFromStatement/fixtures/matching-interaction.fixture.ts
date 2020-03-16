import { merge } from 'lodash';
import InteractionActivityDefinition from '../../../../../models/InteractionActivityDefinition';

import Statement from '../../../../../models/Statement';
import SubStatementObject from '../../../../../models/SubStatementObject';
import { statementDefaults } from './statements.fixture';

const singleMatchingQuestion: Statement = {
  ...statementDefaults,
  ...{
    result: {
      response: 'ben[.]3',
    },
    object: {
      id: 'http://www.example.com/tincan/activities/uyheHUJd76s/question4',
      objectType: 'Activity',
      definition: {
        name: { 'en-US': 'Question 4' },
        description: { 'en-US': 'Match these people to their kickball team:' },
        type: 'http://adlnet.gov/expapi/activities/cmi.interaction',
        interactionType: 'matching',
        correctResponsesPattern: [
          'ben[.]3[,]chris[.]2[,]troy[.]4[,]freddie[.]1',
        ],
        source: [
          {
            id: 'ben',
            description: { 'en-US': 'Ben' },
          },
          {
            id: 'chris',
            description: { 'en-US': 'Chris' },
          },
          {
            id: 'troy',
            description: { 'en-US': 'Troy' },
          },
          {
            id: 'freddie',
            description: { 'en-US': 'Freddie' },
          },
        ],
        target: [
          {
            id: '1',
            description: { 'en-US': 'SCORM Engine' },
          },
          {
            id: '2',
            description: { 'en-US': 'Pure-sewage' },
          },
          {
            id: '3',
            description: { 'en-US': 'Tin Can xAPI' },
          },
          {
            id: '4',
            description: { 'en-US': 'SCORM Cloud' },
          },
        ],
      } as Partial<InteractionActivityDefinition>,
    } as SubStatementObject,
  } as Partial<Statement>,
};

const multipleMatchingQuestions: Statement = merge(
  {},
  singleMatchingQuestion,
  {
    result: {
      response: 'ben[.]3[,]chris[.]2[,]troy[.]4[,]freddie[.]1',
    },
  } as Partial<Statement>,
);

export {
  singleMatchingQuestion,
  multipleMatchingQuestions,
};
