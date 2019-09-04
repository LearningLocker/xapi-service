import { OK } from 'http-status-codes';
import { route, xapiHeaderVersion } from '../../../utils/constants';
import createTextProfile from '../../../utils/createTextProfile';
import {
  ALTERNATE_CONTENT_TYPE,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_PROFILE_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';

describe('expressPresenter.getProfile using the alternate request syntax', () => {
  const { supertest } = setup();

  it('should get when getting text', async () => {
    await createTextProfile();
    await supertest
      .post(`${route}/profile`)
      .set('Content-Type', ALTERNATE_CONTENT_TYPE)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .query({ method: 'GET' })
      .send({
        agent: JSON.stringify(TEST_MBOX_AGENT),
        profileId: TEST_PROFILE_ID,
      })
      .expect(OK, TEST_CONTENT);
  });
});
