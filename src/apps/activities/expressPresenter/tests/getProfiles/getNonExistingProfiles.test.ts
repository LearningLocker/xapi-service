import { BAD_REQUEST, OK } from 'http-status-codes';
import createTextProfile from '../../../utils/createTextProfile';
import {
  TEST_INVALID_ACTIVITY_ID,
  TEST_INVALID_TIMESTAMP,
  TEST_PROFILE_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import getProfiles from './utils/getProfiles';

describe('expressPresenter.getProfiles with non-existing agent', () => {
  setup();

  it('should return no profile ids when getting a non-existing activity id', async () => {
    await createTextProfile();
    await getProfiles().expect(OK, [TEST_PROFILE_ID]);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    await getProfiles({
      activityId: TEST_INVALID_ACTIVITY_ID,
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when using an invalid since', async () => {
    await getProfiles({
      since: TEST_INVALID_TIMESTAMP,
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the activity id', async () => {
    await getProfiles({
      activityId: undefined,
    }).expect(BAD_REQUEST);
  });
});
