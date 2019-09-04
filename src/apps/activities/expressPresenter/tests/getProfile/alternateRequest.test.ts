import { OK } from 'http-status-codes';
import { route, xapiHeaderVersion } from '../../../utils/constants';
import createTextProfile from '../../../utils/createTextProfile';
import {
  ALTERNATE_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_CONTENT,
  TEST_PROFILE_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';

describe('expressPresenter.getProfile using the alternate request syntax', () => {
  const { supertest } = setup();

  it('should get when getting text', async () => {
    await createTextProfile();
    await supertest
      .post(route)
      .set('Content-Type', ALTERNATE_CONTENT_TYPE)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .query({ method: 'GET' })
      .send({
        activityId: TEST_ACTIVITY_ID,
        profileId: TEST_PROFILE_ID,
      })
      .expect(OK, TEST_CONTENT);
  });
});
