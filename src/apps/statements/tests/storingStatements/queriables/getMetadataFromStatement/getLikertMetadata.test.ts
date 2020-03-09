import * as assert from 'assert';

import { getLikertMetadata } from '../../../../service/storeStatements/queriables/getMetadataFromStatement/getLikertMetadata';
import { likertStatement } from './fixtures/likert.fixture';

describe('Retrieve likert metadata from statement', () => {
  it('should return empty metadata from empty result', () => {
    const expectedEmptyMetadata = {};
    const actualEmptyMetadataFromEmptyResult = getLikertMetadata(
      {
        ...likertStatement,
        ...{
          result: {},
        },
      },
    );

    assert.deepEqual(actualEmptyMetadataFromEmptyResult, expectedEmptyMetadata);
  });

  it('should retrieve metadata when likert is provided in the result', () => {
    const actualCorrectMetadata = getLikertMetadata(likertStatement);
    const expectedCorrectMetadata = {
      'https://learninglocker&46;net/likert-response': 'likert_3',
    };

    assert.deepEqual(actualCorrectMetadata, expectedCorrectMetadata);
  });
});
