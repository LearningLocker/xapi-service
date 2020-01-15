import * as assert from 'assert';

import { getNumericQuestionMetadata } from '../../../../service/storeStatements/queriables/getMetadataFromStatement/getNumericQuestionMetadata';
import { numericQuestionInteractionActivityStatement } from './fixtures/numeric-question-interaction.fixture';

describe('Retrieve numeric question metadata from statement', () => {
  it('should return empty metadata from empty result', () => {
    const expectedEmptyMetadata = {};

    const actualEmptyMetadataFromEmptyResult = getNumericQuestionMetadata(
      {
        ...numericQuestionInteractionActivityStatement,
        ...{
          result: {},
        },
      },
    );

    assert.deepEqual(actualEmptyMetadataFromEmptyResult, expectedEmptyMetadata);
  });

  it('should return numeric question for correct result', () => {
    const actualCorrectMetadata = getNumericQuestionMetadata(
      numericQuestionInteractionActivityStatement,
    );
    const expectedCorrectMetadata = {
      'https://learninglocker.net/numeric-response': 4,
    };

    assert.deepEqual(actualCorrectMetadata, expectedCorrectMetadata);
  });
});
