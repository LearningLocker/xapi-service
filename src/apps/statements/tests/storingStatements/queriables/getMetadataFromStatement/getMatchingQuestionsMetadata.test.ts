import * as assert from 'assert';

import { getMatchingQuestionsMetadata } from '../../../../service/storeStatements/queriables/getMetadataFromStatement/getMatchingQuestionsMetadata';
import {
  multipleMatchingQuestions,
  singleMatchingQuestion,
} from './fixtures/matching-interaction.fixture';

describe('Retrieve matching questions metadata from statement', () => {
  it('should return matching questions metadata from statement', () => {
    const expectedEmptyMetadata = {};

    const actualEmptyMetadataFromEmptyResult = getMatchingQuestionsMetadata(
      {
        ...singleMatchingQuestion,
        ...{
          result: {},
        },
      },
    );

    assert.deepEqual(actualEmptyMetadataFromEmptyResult, expectedEmptyMetadata);
  });

  it('should return metadata from single matching question', () => {
    const actualSingleMatchingQuestionMetadata = getMatchingQuestionsMetadata(
      singleMatchingQuestion,
    );
    const expectedSingleMatchingQuestionMetadata = {
      'https://learninglocker&46;net/matching-response': [
        ['ben', '3'],
      ],
    };

    assert.deepEqual(actualSingleMatchingQuestionMetadata, expectedSingleMatchingQuestionMetadata);
  });

  it('should return metadata from multiple matching questions', () => {
    const actualMultipleMatchingQuestionsMetadata = getMatchingQuestionsMetadata(
      multipleMatchingQuestions,
    );
    const expectedMultipleMatchingQuestionsMetadata = {
      'https://learninglocker&46;net/matching-response': [
        ['ben', '3'],
        ['chris', '2'],
        ['troy', '4'],
        ['freddie', '1'],
      ],
    };

    assert
      .deepEqual(
        actualMultipleMatchingQuestionsMetadata,
        expectedMultipleMatchingQuestionsMetadata,
      );
  });
});
