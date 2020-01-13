import * as assert from 'assert';

import { getSequencingMetadata } from '../../../../service/storeStatements/queriables/getMetadataFromStatement/getSequencingMetadata';
import {
  multipleItemsSequence,
  singleItemSequence,
} from './fixtures/sequencing-interaction.fixture';
import { statementDefaults } from './fixtures/statements.fixture';

describe('Retrieve sequencing metadata from statement', () => {
  it('should return empty metadata from empty result', () => {
    const expectedEmptyMetadata = false;

    // ----------------------------------------------------------------------------------------
    const actualEmptyMetadataFromEmptyResult = getSequencingMetadata(
      {
        ...multipleItemsSequence,
        ...{
          result: {},
        },
      },
    );

    assert.equal(actualEmptyMetadataFromEmptyResult, expectedEmptyMetadata);
  });

  it('should return empty metadata from invalid result', () => {
    const actualEmptyMetadataFromInvalidResult = getSequencingMetadata(statementDefaults);
    const expectedEmptyMetadata = false;

    assert.equal(actualEmptyMetadataFromInvalidResult, expectedEmptyMetadata);

    const actualMetadataFromIncorrectResponseValue = getSequencingMetadata(singleItemSequence);

    assert.deepEqual(actualMetadataFromIncorrectResponseValue, expectedEmptyMetadata);
  });

  it(
    'should return empty metadata when there is only one item provided in result',
    () => {
      const expectedEmptyMetadata = false;
      const actualMetadataFromIncorrectResponseValue = getSequencingMetadata(singleItemSequence);

      assert.deepEqual(actualMetadataFromIncorrectResponseValue, expectedEmptyMetadata);
    },
  );

  it('should return choices with proper order(sequence)', () => {
    const actualCorrectMetadata = getSequencingMetadata(multipleItemsSequence);
    const expectedCorrectMetadata = {
      'https://learninglocker&46;net/sequencing-response': ['tim', 'mike', 'ells', 'ben'],
    };

    assert.deepEqual(actualCorrectMetadata, expectedCorrectMetadata);
  });
});
