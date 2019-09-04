import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import assertProfile from '../../../utils/assertProfile';
import {
  TEST_CONTENT,
  TEST_INVALID_ACTIVITY_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import overwriteProfile from './utils/overwriteProfile';

describe('overwriteProfile with non-existing model', () => {
  setup();

  it('should create when using valid activity id', async () => {
    await overwriteProfile({}, TEST_CONTENT);
    await assertProfile(TEST_CONTENT);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    const promise = overwriteProfile({
      activityId: TEST_INVALID_ACTIVITY_ID,
    }, TEST_CONTENT);
    await assertError(Warnings, promise);
  });
});
