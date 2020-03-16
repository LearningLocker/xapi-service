import * as assert from 'assert';
import { merge } from 'lodash';

import getMetadataFromStatement
  from '../../../../service/storeStatements/queriables/getMetadataFromStatement';
import { multipleChoices } from './fixtures/choice-interaction.fixture';
import { likertStatement } from './fixtures/likert.fixture';
import { multipleMatchingQuestions } from './fixtures/matching-interaction.fixture';
import {
  sequencingInteractionActivityStatement,
  statementDefaults,
} from './fixtures/statements.fixture';

describe('Retrieve metadata from statement', () => {
  it('should retrieve duration metadata from statement', () => {
    const actualDurationMetadata = getMetadataFromStatement(statementDefaults);
    const expectedDurationMetadata = {
      'https://learninglocker&46;net/result-duration': { seconds: 37080306 },
    };

    assert.deepEqual(actualDurationMetadata, expectedDurationMetadata);
  });

  it('should return sequencing metadata from statement', () => {
    const actualSequencingMetadata = getMetadataFromStatement(
      sequencingInteractionActivityStatement,
    );
    const expectedSequencingMetadata = {
      'https://learninglocker&46;net/sequencing-response': ['tim', 'mike', 'ells', 'ben'],
    };

    assert.deepEqual(actualSequencingMetadata, expectedSequencingMetadata);
  });

  it('should return duration and sequencing metadata from one statement', () => {
    const statementWithDurationAndSequencing = merge(
      {},
      sequencingInteractionActivityStatement,
      {
        result: {
          duration: 'P1Y2M3DT4H5M6S',
        },
      },
    );
    const actualMetadata = getMetadataFromStatement(statementWithDurationAndSequencing);
    const expectedMetadata = {
      'https://learninglocker&46;net/result-duration': { seconds: 37080306 },
      'https://learninglocker&46;net/sequencing-response': ['tim', 'mike', 'ells', 'ben'],
    };

    assert.deepEqual(actualMetadata, expectedMetadata);
  });

  it('should retrieve likert metadata from statement', () => {
    const actualLikertMetadata = getMetadataFromStatement(likertStatement);
    const expectedLikertMetadata = {
      'https://learninglocker&46;net/likert-response': 'likert_3',
    };

    assert.deepEqual(actualLikertMetadata, expectedLikertMetadata);
  });

  it('should return choices metadata from statement', () => {
    const actualMetadata = getMetadataFromStatement(
      {
        ...multipleChoices,
        ...{
          result: {
            response: multipleChoices.result?.response,
          },
        },
      },
    );
    const expectedMetadata = {
      'https://learninglocker&46;net/choice-response': ['golf', 'tetris'],
    };

    assert.deepEqual(actualMetadata, expectedMetadata);
  });

  it('should return matching questions metadata', () => {
    const actualMatchingQuestionsMetadata = getMetadataFromStatement(multipleMatchingQuestions);
    const expectedMatchingQuestionsMetadata = {
      'https://learninglocker&46;net/matching-response': [
        ['ben', '3'],
        ['chris', '2'],
        ['troy', '4'],
        ['freddie', '1'],
      ],
    };

    assert.deepEqual(actualMatchingQuestionsMetadata, expectedMatchingQuestionsMetadata);
  });
});
