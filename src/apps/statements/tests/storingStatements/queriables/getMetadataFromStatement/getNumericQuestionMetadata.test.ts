import * as assert from 'assert';

import { getNumericQuestionMetadata } from '../../../../service/storeStatements/queriables/getMetadataFromStatement/getNumericQuestionMetadata';
import {
  numericQuestionInteractionActivityStatement as statementFixture,
  numericQuestionWithMinAndMaxInteractionActivityStatement as statementWithMinAndMaxFixture,
} from './fixtures/numeric-question-interaction.fixture';

describe('Retrieve numeric question metadata from statement', () => {
  it('should return empty metadata from empty result', () => {
    const expectedEmptyMetadata = {};

    const actualEmptyMetadataFromEmptyResult = getNumericQuestionMetadata(
      {
        ...statementFixture,
        ...{
          result: {},
        },
      },
    );

    assert.deepEqual(actualEmptyMetadataFromEmptyResult, expectedEmptyMetadata);
  });

  it('should return numeric question for correct result', () => {
    const actualCorrectMetadata = getNumericQuestionMetadata(
      statementFixture,
    );
    const expectedCorrectMetadata = {
      'https://learninglocker&46;net/numeric-response': 4,
    };

    assert.deepEqual(actualCorrectMetadata, expectedCorrectMetadata);
  });

  it('should return numeric question with min and max values for correct result', () => {
    const actualCorrectMetadata = getNumericQuestionMetadata(
      statementWithMinAndMaxFixture,
    );
    const expectedCorrectMetadata = {
      'https://learninglocker&46;net/numeric-response': {
        min: 4,
        max: 5,
      },
    };

    assert.deepEqual(actualCorrectMetadata, expectedCorrectMetadata);
  });
});
