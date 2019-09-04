import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import getTestProfiles from '../../../utils/getTestProfiles';
import {
  TEST_INVALID_AGENT,
  TEST_INVALID_TIMESTAMP,
} from '../../../utils/testValues';
import setup from '../utils/setup';

describe('getProfiles with non-existing agent', () => {
  setup();

  it('should return no profile ids when getting a non-existing agent', async () => {
    const profilesResult = await getTestProfiles();
    assert.deepEqual(profilesResult.profileIds, []);
  });

  it('should throw warnings when using an invalid agent', async () => {
    const promise = getTestProfiles({
      agent: TEST_INVALID_AGENT,
    });
    await assertError(Warnings, promise);
  });

    it('should throw warnings when using an invalid since', async () => {
      const promise = getTestProfiles({
        since: TEST_INVALID_TIMESTAMP,
      });
      await assertError(Warnings, promise);
    });
});
