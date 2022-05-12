import * as assert from 'assert';

import Statement from '../../../../models/Statement';
import { getSequencingMetadata } from '../../../../service/storeStatements/queriables/getMetadataFromStatement/getSequencingMetadata';
import {
  sequencingInteractionActivityStatement,
  statementDefaults,
} from './fixtures/statements.fixture';

describe('Retrieve sequencing metadata from statement', () => {
  it('should return empty metadata from empty result', () => {
    const expectedEmptyMetadata = {};

    const actualEmptyMetadataFromEmptyResult = getSequencingMetadata({
      ...sequencingInteractionActivityStatement,
      ...{
        result: {},
      },
    });

    assert.deepStrictEqual(actualEmptyMetadataFromEmptyResult, expectedEmptyMetadata);
  });

  it('should return empty metadata from invalid result', () => {
    const actualEmptyMetadataFromInvalidResult = getSequencingMetadata(statementDefaults);
    const expectedEmptyMetadata = {};

    assert.deepStrictEqual(actualEmptyMetadataFromInvalidResult, expectedEmptyMetadata);

    const actualMetadataFromIncorrectResponseValue = getSequencingMetadata({
      ...sequencingInteractionActivityStatement,
      ...({
        result: {
          response: 'tim',
        },
      } as Partial<Statement>),
    });

    assert.deepStrictEqual(actualMetadataFromIncorrectResponseValue, expectedEmptyMetadata);
  });

  it('should return empty metadata when there is only one item provided in result', () => {
    const expectedEmptyMetadata = {};
    const actualMetadataFromIncorrectResponseValue = getSequencingMetadata({
      ...sequencingInteractionActivityStatement,
      ...({
        result: {
          response: 'tim',
        },
      } as Partial<Statement>),
    });

    assert.deepStrictEqual(actualMetadataFromIncorrectResponseValue, expectedEmptyMetadata);
  });

  it('should return choices with proper order(sequence)', () => {
    const actualCorrectMetadata = getSequencingMetadata(sequencingInteractionActivityStatement);
    const expectedCorrectMetadata = {
      'https://learninglocker&46;net/sequencing-response': ['tim', 'mike', 'ells', 'ben'],
    };

    assert.deepStrictEqual(actualCorrectMetadata, expectedCorrectMetadata);
  });
});
