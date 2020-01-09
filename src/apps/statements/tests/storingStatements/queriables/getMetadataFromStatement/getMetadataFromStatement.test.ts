import * as assert from 'assert';
import { merge } from 'lodash';

import getMetadataFromStatement
  from '../../../../service/storeStatements/queriables/getMetadataFromStatement';
import {
  sequencingInteractionActivityStatement,
  statementDefaults,
} from './fixtures/statements.fixture';

describe('Retrieve metadata from statement', () => {
  it('should retrieve duration metadata from statement', () => {
    const actualDurationMetadata = getMetadataFromStatement(statementDefaults);
    const expectedDurationMetadata = {
      'https://learninglocker&46;net/result-duration': { seconds: 37080306 },
    };

    assert.deepEqual(actualDurationMetadata, expectedDurationMetadata);
  });

  it('should return sequencing metadata from statement', () => {
    const actualSequencingMetadata = getMetadataFromStatement(
      sequencingInteractionActivityStatement,
    );
    const expectedSequencingMetadata = {
      'https://learninglocker&46;net/sequencing-response': ['tim', 'mike', 'ells', 'ben'],
    };

    assert.deepEqual(actualSequencingMetadata, expectedSequencingMetadata);
  });

  it('should return duration ans sequencing metadata from one statement', () => {
    const statementWithDurationAndSequencing = merge(
      {},
      sequencingInteractionActivityStatement,
      {
        result: {
          duration: 'P1Y2M3DT4H5M6S',
        },
      },
    );
    const actualMetadata = getMetadataFromStatement(statementWithDurationAndSequencing);
    const expectedMetadata = {
      'https://learninglocker&46;net/result-duration': { seconds: 37080306 },
      'https://learninglocker&46;net/sequencing-response': ['tim', 'mike', 'ells', 'ben'],
    };

    assert.deepEqual(actualMetadata, expectedMetadata);
  });
});
