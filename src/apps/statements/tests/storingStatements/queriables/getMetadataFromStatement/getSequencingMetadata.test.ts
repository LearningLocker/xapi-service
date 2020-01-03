import * as assert from 'assert';

import Statement from 'src/apps/statements/models/Statement';
import { getSequencingMetadata } from '../../../../service/storeStatements/queriables/getMetadataFromStatement/getSequencingMetadata';
import { interactionActivityStatement, statementDefaults } from './fixtures/statements.fixture';

describe('Retrieve sequencing metadata from statement', () => {
  it('should return choices with proper order(sequence)', () => {
    const expectedEmptyMetadata = false;

    // ----------------------------------------------------------------------------------------
    const actualEmptyMetadataFromEmptyResult = getSequencingMetadata(
      {
        ...interactionActivityStatement,
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

    const actualMetadataFromIncorrectResponseValue = getSequencingMetadata(
      {
        ...interactionActivityStatement,
        ...{
          result: {
            response: 'tim',
          },
        } as Partial<Statement>,
      },
    );

    assert.deepEqual(actualMetadataFromIncorrectResponseValue, expectedEmptyMetadata);

    // ----------------------------------------------------------------------------------------

    const actualCorrectMetadata = getSequencingMetadata(interactionActivityStatement);
    const expectedCorrectMetadata = {
      'https://learninglocker&46;net/sequencing-response': ['tim', 'mike', 'ells', 'ben'],
    };

    assert.deepEqual(actualCorrectMetadata, expectedCorrectMetadata);
  });
});
