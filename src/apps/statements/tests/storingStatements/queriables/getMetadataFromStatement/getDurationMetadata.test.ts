import * as assert from 'assert';

import { getDurationMetadata } from '../../../../service/storeStatements/queriables/getMetadataFromStatement/getDurationMetadata';
import { statementDefaults } from './fixtures/statements.fixture';

describe('Retrieve duration metadata from statement', () => {
  it('should return empty metadata from empty result', () => {
    const expectedEmptyMetadata = {};
    const actualEmptyMetadataFromEmptyResult = getDurationMetadata(
      {
        ...statementDefaults,
        ...{
          result: {},
        },
      },
    );

    assert.deepEqual(actualEmptyMetadataFromEmptyResult, expectedEmptyMetadata);
  });

  it('should retrieve metadata when duration is provided in the result', () => {
    const actualCorrectMetadata = getDurationMetadata(statementDefaults);
    const expectedCorrectMetadata = {
      'https://learninglocker&46;net/result-duration': { seconds: 37080306 },
    };

    assert.deepEqual(actualCorrectMetadata, expectedCorrectMetadata);
  });
});
