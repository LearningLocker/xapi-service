import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import getTestProfile from '../../../utils/getTestProfile';
import { TEST_INVALID_AGENT } from '../../../utils/testValues';
import setup from '../utils/setup';

describe('getProfile with non-existing model', () => {
  setup();

  it('should error when getting a non-existing model', async () => {
    const promise = getTestProfile();
    await assertError(NoModel, promise);
  });

  it('should throw warnings when using an invalid agent', async () => {
    const promise = getTestProfile({
      agent: TEST_INVALID_AGENT,
    });
    await assertError(Warnings, promise);
  });
});
