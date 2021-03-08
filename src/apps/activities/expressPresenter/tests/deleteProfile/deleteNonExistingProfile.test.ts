import { StatusCodes } from 'http-status-codes';
import { TEST_INVALID_ACTIVITY_ID } from '../../../utils/testValues';
import setup from '../utils/setup';
import deleteProfile from './utils/deleteProfile';

describe('expressPresenter.deleteProfile with non-existing state', () => {
  setup();

  it('should error when deleting', async () => {
    await deleteProfile().expect(StatusCodes.NO_CONTENT);
  });

  it('should throw warnings when using an invalid activityId', async () => {
    await deleteProfile({
      activityId: TEST_INVALID_ACTIVITY_ID,
    }).expect(StatusCodes.BAD_REQUEST);
  });

  it('should throw warnings when missing the profile id', async () => {
    await deleteProfile({ profileId: undefined }).expect(StatusCodes.BAD_REQUEST);
  });

  it('should throw warnings when missing the activityId', async () => {
    await deleteProfile({ activityId: undefined }).expect(StatusCodes.BAD_REQUEST);
  });
});
