import * as assert from 'assert';

import { getDurationMetadata } from '../../../../service/storeStatements/queriables/getMetadataFromStatement/getDurationMetadata';
import { statementDefaults } from './fixtures/statements.fixture';

describe(
  'Retrieve duration metadata from statement',
  () => {
    it(
      'should return result duration statement',
      () => {
        const metadata = getDurationMetadata(statementDefaults);
        assert.deepEqual(metadata, {
          'https://learninglocker&46;net/result-duration': { seconds: 37080306 },
        });
      },
    );
  },
);
