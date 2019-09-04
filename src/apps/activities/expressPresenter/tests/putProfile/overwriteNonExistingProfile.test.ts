import { BAD_REQUEST, NO_CONTENT } from 'http-status-codes';
import assertProfile from '../../../utils/assertProfile';
import {
  TEST_CONTENT,
  TEST_INVALID_ACTIVITY_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import overwriteProfile from './utils/overwriteProfile';

describe('expressPresenter.putProfile with non-existing model', () => {
  setup();

  it('should create when using valid activityId', async () => {
    await overwriteProfile().expect(NO_CONTENT);
    await assertProfile(TEST_CONTENT);
  });

  it('should throw warnings when using an invalid activityId', async () => {
    await overwriteProfile({
      activityId: TEST_INVALID_ACTIVITY_ID,
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the activityId', async () => {
    await overwriteProfile({ activityId: undefined }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the profile id', async () => {
    await overwriteProfile({ profileId: undefined }).expect(BAD_REQUEST);
  });
});
