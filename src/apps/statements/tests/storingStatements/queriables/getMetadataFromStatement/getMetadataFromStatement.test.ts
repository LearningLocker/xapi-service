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
        assert.deepEqual(
          getMetadataFromStatement(statementDefaults),
          {
            'https://learninglocker&46;net/result-duration': { seconds: 37080306 },
          },
        );

        assert.deepEqual(
          getMetadataFromStatement(interactionActivityStatement),
          {
            'https://learninglocker&46;net/sequencing-response': {
              sequence: [
                { id: 'tim', description: { 'en-US': 'Tim' } },
                { id: 'mike', description: { 'en-US': 'Mike' } },
                { id: 'ells', description: { 'en-US': 'Ells' } },
                { id: 'ben', description: { 'en-US': 'Ben' } },
              ],
            },
          },
        );
      },
    );
  },
);
