import * as assert from 'assert';

import Statement from 'src/apps/statements/models/Statement';
import { getSequencingMetadata } from '../../../../service/storeStatements/queriables/getMetadataFromStatement/getSequencingMetadata';
import { sequencingInteractionActivityStatement, statementDefaults } from './fixtures/statements.fixture';

describe('Retrieve sequencing metadata from statement', () => {
  it('should return empty metadata from empty result', () => {
    const expectedEmptyMetadata = false;

    // ----------------------------------------------------------------------------------------
    const actualEmptyMetadataFromEmptyResult = getSequencingMetadata(
      {
        ...sequencingInteractionActivityStatement,
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

    const actualMetadataFromIncorrectResponseValue = getSequencingMetadata(
      {
        ...sequencingInteractionActivityStatement,
        ...{
          result: {
            response: 'tim',
          },
        } as Partial<Statement>,
      },
    );

    assert.deepEqual(actualMetadataFromIncorrectResponseValue, expectedEmptyMetadata);
  });

  it(
    'should return empty metadata when there is only one item provided in result',
    () => {
      const expectedEmptyMetadata = false;
      const actualMetadataFromIncorrectResponseValue = getSequencingMetadata(
        {
          ...sequencingInteractionActivityStatement,
          ...{
            result: {
              response: 'tim',
            },
          } as Partial<Statement>,
        },
      );

      assert.deepEqual(actualMetadataFromIncorrectResponseValue, expectedEmptyMetadata);
    },
  );

  it('should return choices with proper order(sequence)', () => {
    const actualCorrectMetadata = getSequencingMetadata(sequencingInteractionActivityStatement);
    const expectedCorrectMetadata = {
      'https://learninglocker&46;net/sequencing-response': ['tim', 'mike', 'ells', 'ben'],
    };

    assert.deepEqual(actualCorrectMetadata, expectedCorrectMetadata);
  });
});
