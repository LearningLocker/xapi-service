import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import { TEST_INVALID_ACTIVITY_ID } from '../../../utils/testValues';
import setup from '../utils/setup';
import getProfile from './utils/getProfile';

describe('expressPresenter.getProfile with non-existing model', () => {
  setup();

  it('should error when getting a non-existing model', async () => {
    await getProfile().expect(NOT_FOUND);
  });

  it('should throw warnings when using an invalid activityId', async () => {
    await getProfile({
      activityId: JSON.stringify(TEST_INVALID_ACTIVITY_ID),
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the activityId', async () => {
    await getProfile({ activityId: undefined }).expect(BAD_REQUEST);
  });
});
