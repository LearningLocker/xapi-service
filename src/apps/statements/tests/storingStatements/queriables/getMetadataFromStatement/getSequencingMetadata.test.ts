import * as assert from 'assert';
import { assign } from 'lodash';

import { getSequencingMetadata } from '../../../../service/storeStatements/queriables/getMetadataFromStatement/getSequencingMetadata';
import { interactionActivityStatement, statementDefaults } from './fixtures/statements.fixture';

describe(
  'Retrieve duration metadata from statement',
  () => {
    it(
      'should return choices with proper order(sequence)',
      () => {
        assert
          .equal(
            getSequencingMetadata(
              assign(
                {},
                interactionActivityStatement,
                {
                  result: {},
                },
              ),
            ),
            false,
          );

        assert
          .equal(getSequencingMetadata(statementDefaults), false);

        assert
          .deepEqual(
            getSequencingMetadata(
              assign(
                {},
                interactionActivityStatement,
                {
                  result: {
                    response: 'tim',
                  },
                },
              ),
            ),
            false,
          );

        assert.deepEqual(
          getSequencingMetadata(interactionActivityStatement),
          {
            'https://learninglocker&46;net/sequencing-response': {
              sequence: [
                { id: 'tim', description: { 'en-US': 'Tim' } },
                { id: 'mike', description: { 'en-US': 'Mike' } },
                { id: 'ells', description: { 'en-US': 'Ells' } },
                { id: 'ben', description: { 'en-US': 'Ben' } },
              ],
            },
          });
      },
    );
  },
);
