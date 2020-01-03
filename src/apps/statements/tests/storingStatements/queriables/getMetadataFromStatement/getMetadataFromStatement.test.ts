import * as assert from 'assert';

import getMetadataFromStatement
  from '../../../../service/storeStatements/queriables/getMetadataFromStatement';
import { interactionActivityStatement, statementDefaults } from './fixtures/statements.fixture';

describe(
  'Retrieve metadata from statement',
  () => {
    it(
      'should retrieve metadata from statement',
      () => {
        const actualDurationMetadata = getMetadataFromStatement(statementDefaults);
        const expectedDurationMetadata = {
          'https://learninglocker&46;net/result-duration': { seconds: 37080306 },
        };

        assert.deepEqual(actualDurationMetadata, expectedDurationMetadata);

        // ----------------------------------------------------------------------------------------

        const actualSequencingMetadata = getMetadataFromStatement(interactionActivityStatement);
        const expectedSequencingMetadata = {
          'https://learninglocker&46;net/sequencing-response': {
            sequence: [
              { id: 'tim', description: { 'en-US': 'Tim' } },
              { id: 'mike', description: { 'en-US': 'Mike' } },
              { id: 'ells', description: { 'en-US': 'Ells' } },
              { id: 'ben', description: { 'en-US': 'Ben' } },
            ],
          },
        };

        assert.deepEqual(actualSequencingMetadata, expectedSequencingMetadata);
      },
    );
  },
);
