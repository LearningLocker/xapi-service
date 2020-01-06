import * as assert from 'assert';

import { getMatchingQuestionsMetadata } from '../../../../service/storeStatements/queriables/getMetadataFromStatement/getMatchingQuestionsMetadata';
import {
  multipleMatchingQuestions,
  singleMatchingQuestion,
} from './fixtures/matching-interaction.fixture';

describe('Retrieve choices metadata from statement', () => {
  it('should return choices metadata from statement', () => {
    const expectedEmptyMetadata = false;

    // ----------------------------------------------------------------------------------------

    const actualEmptyMetadataFromEmptyResult = getMatchingQuestionsMetadata(
      {
        ...singleMatchingQuestion,
        ...{
          result: {},
        },
      },
    );

    assert.equal(actualEmptyMetadataFromEmptyResult, expectedEmptyMetadata);

    // ----------------------------------------------------------------------------------------

    const actualSingleMatchingQuestionMetadata = getMatchingQuestionsMetadata(
      singleMatchingQuestion,
    );
    const expectedSingleMatchingQuestionMetadata = {
      'https://learninglocker&46;net/matching-response': [
        ['ben', '3'],
      ],
    };

    assert.deepEqual(actualSingleMatchingQuestionMetadata, expectedSingleMatchingQuestionMetadata);

    // ----------------------------------------------------------------------------------------

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
