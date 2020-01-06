import * as assert from 'assert';

import { getSequencingMetadata } from '../../../../service/storeStatements/queriables/getMetadataFromStatement/getSequencingMetadata';
import {
  multipleItemsSequence,
  singleItemSequence,
} from './fixtures/sequencing-interaction.fixture';
import { statementDefaults } from './fixtures/statements.fixture';

describe('Retrieve sequencing metadata from statement', () => {
  it('should return choices with proper order(sequence)', () => {
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

    // ----------------------------------------------------------------------------------------

    const actualEmptyMetadataFromInvalidResult = getSequencingMetadata(statementDefaults);

    assert.equal(actualEmptyMetadataFromInvalidResult, expectedEmptyMetadata);

    // ----------------------------------------------------------------------------------------

    const actualSingleItemSequenceMetadata = getSequencingMetadata(singleItemSequence);

    assert.deepEqual(actualSingleItemSequenceMetadata, expectedEmptyMetadata);

    // ----------------------------------------------------------------------------------------

    const actualMultipleItemsSequenceMetadata = getSequencingMetadata(multipleItemsSequence);
    const expectedMultipleItemsSequenceMetadata = {
      'https://learninglocker&46;net/sequencing-response': ['tim', 'mike', 'ells', 'ben'],
    };

    assert.deepEqual(actualMultipleItemsSequenceMetadata, expectedMultipleItemsSequenceMetadata);
  });
});
