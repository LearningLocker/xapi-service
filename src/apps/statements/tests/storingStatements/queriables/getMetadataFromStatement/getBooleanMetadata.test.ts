import * as assert from 'assert';
import Statement from '../../../../models/Statement';

import { getBooleanMetadata } from '../../../../service/storeStatements/queriables/getMetadataFromStatement/getBooleanMetadata';
import { booleanInteractionActivityStatement } from './fixtures/boolean.fixture';

describe('Retrieve sequencing metadata from statement', () => {
  it('should return empty metadata from empty result', () => {
    const expectedEmptyMetadata = {};

    const actualEmptyMetadataFromEmptyResult = getBooleanMetadata(
      {
        ...booleanInteractionActivityStatement,
        ...{
          result: {},
        } as Partial<Statement>,
      },
    );

    assert.deepEqual(actualEmptyMetadataFromEmptyResult, expectedEmptyMetadata);
  });

  it('should return false metadata when `false` provided in the result', () => {
    const actualCorrectMetadata = getBooleanMetadata(
      {
        ...booleanInteractionActivityStatement,
        ...{
          result: {
            response: 'false',
          },
        } as Partial<Statement>,
      },
    );

    const expectedCorrectMetadata = {
      'https://learninglocker&46;net/true-false-response': 'false',
    };

    assert.deepEqual(actualCorrectMetadata, expectedCorrectMetadata);
  });

  it('should return true metadata when `true` provided in the result', () => {
    const actualCorrectMetadata = getBooleanMetadata(booleanInteractionActivityStatement);

    const expectedCorrectMetadata = {
      'https://learninglocker&46;net/true-false-response': 'true',
    };

    assert.deepEqual(actualCorrectMetadata, expectedCorrectMetadata);
  });
});
