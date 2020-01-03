import * as assert from 'assert';
import { assign } from 'lodash';

import { getDurationMetadata } from '../../../../service/storeStatements/queriables/getMetadataFromStatement/getDurationMetadata';
import { statementDefaults } from './fixtures/statements.fixture';

describe(
  'Retrieve duration metadata from statement',
  () => {
    it(
      'should return result duration statement',
      () => {
        assert
          .equal(
            getDurationMetadata(
              assign(
                {},
                statementDefaults,
                {
                  result: {},
                },
              ),
            ),
            false,
          );

        assert
          .deepEqual(
            getDurationMetadata(statementDefaults),
            {
              'https://learninglocker&46;net/result-duration': { seconds: 37080306 },
            },
          );
      },
    );
  },
);
