import { NO_CONTENT } from 'http-status-codes';
import assertDeleted from '../../../utils/assertDeleted';
import { route, xapiHeaderVersion } from '../../../utils/constants';
import createTextProfile from '../../../utils/createTextProfile';
import {
  ALTERNATE_CONTENT_TYPE,
  TEST_MBOX_AGENT,
  TEST_PROFILE_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';

describe('expressPresenter.deleteProfile using the alternate request syntax', () => {
  const { supertest } = setup();

  it('should delete when deleting text', async () => {
    await createTextProfile();
    await supertest
      .post(`${route}/profile`)
      .set('Content-Type', ALTERNATE_CONTENT_TYPE)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .query({ method: 'DELETE' })
      .send({
        agent: JSON.stringify(TEST_MBOX_AGENT),
        profileId: TEST_PROFILE_ID,
      })
      .expect(NO_CONTENT);
    await assertDeleted();
  });
});
