import { BAD_REQUEST, NO_CONTENT } from 'http-status-codes';
import { TEST_INVALID_ACTIVITY_ID } from '../../../utils/testValues';
import setup from '../utils/setup';
import deleteProfile from './utils/deleteProfile';

describe('expressPresenter.deleteProfile with non-existing state', () => {
  setup();

  it('should error when deleting', async () => {
    await deleteProfile().expect(NO_CONTENT);
  });

  it('should throw warnings when using an invalid activityId', async () => {
    await deleteProfile({
      activityId: TEST_INVALID_ACTIVITY_ID,
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the profile id', async () => {
    await deleteProfile({ profileId: undefined }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the activityId', async () => {
    await deleteProfile({ activityId: undefined }).expect(BAD_REQUEST);
  });
});
