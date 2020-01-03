import * as assert from 'assert';

import { getDurationMetadata } from '../../../../service/storeStatements/queriables/getMetadataFromStatement/getDurationMetadata';
import { statementDefaults } from './fixtures/statements.fixture';

describe(
  'Retrieve duration metadata from statement',
  () => {
    it(
      'should return result duration statement',
      () => {
        const expectedEmptyMetadata = false;

        // ----------------------------------------------------------------------------------------

        const actualEmptyMetadataFromEmptyResult = getDurationMetadata(
          {
            ...statementDefaults,
            ...{
              result: {},
            },
          },
        );

        assert.equal(actualEmptyMetadataFromEmptyResult, expectedEmptyMetadata);

        // ----------------------------------------------------------------------------------------

        const actualCorrectMetadata = getDurationMetadata(statementDefaults);
        const expectedCorrectMetadata = {
          'https://learninglocker&46;net/result-duration': { seconds: 37080306 },
        };

        assert.deepEqual(actualCorrectMetadata, expectedCorrectMetadata);
      },
    );
  },
);
