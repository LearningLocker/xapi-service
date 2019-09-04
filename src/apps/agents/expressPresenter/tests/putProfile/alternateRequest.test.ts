import { NO_CONTENT } from 'http-status-codes';
import assertProfile from '../../../utils/assertProfile';
import { route, xapiHeaderVersion } from '../../../utils/constants';
import {
  ALTERNATE_CONTENT_TYPE,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_PROFILE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import setup from '../utils/setup';

describe('expressPresenter.putProfile using the alternate request syntax', () => {
  const { supertest } = setup();

  it('should create when using valid activity id', async () => {
    await supertest
      .post(`${route}/profile`)
      .set('Content-Type', ALTERNATE_CONTENT_TYPE)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .query({
        method: 'PUT',
      })
      .send({
        'Content-Type': TEXT_CONTENT_TYPE,
        'If-None-Match': '*',
        agent: JSON.stringify(TEST_MBOX_AGENT),
        content: TEST_CONTENT,
        profileId: TEST_PROFILE_ID,
      })
      .expect(NO_CONTENT);
    await assertProfile(TEST_CONTENT);
  });
});
