import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import getTestProfiles from '../../../utils/getTestProfiles';
import {
  TEST_INVALID_ACTIVITY_ID,
  TEST_INVALID_TIMESTAMP,
} from '../../../utils/testValues';
import setup from '../utils/setup';

describe('getProfiles with non-existing agent', () => {
  setup();

  it('should return no profile ids when getting a non-existing activity id', async () => {
    const profilesResult = await getTestProfiles();
    assert.deepEqual(profilesResult.profileIds, []);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    const promise = getTestProfiles({
      activityId: TEST_INVALID_ACTIVITY_ID,
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
