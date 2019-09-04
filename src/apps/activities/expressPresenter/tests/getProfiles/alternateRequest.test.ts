import { OK } from 'http-status-codes';
import { route, xapiHeaderVersion } from '../../../utils/constants';
import {
  ALTERNATE_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';

describe('expressPresenter.getProfiles using the alternate request syntax', () => {
  const { supertest } = setup();

  it('should return no profile ids when getting a non-existing activity id', async () => {
    await supertest
      .post(route)
      .set('Content-Type', ALTERNATE_CONTENT_TYPE)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .query({ method: 'GET' })
      .send({ activityId: TEST_ACTIVITY_ID })
      .expect(OK, []);
  });
});
