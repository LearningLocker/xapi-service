import { BAD_REQUEST, OK } from 'http-status-codes';
import { route, xapiHeaderVersion } from '../../../utils/constants';
import createTextState from '../../../utils/createTextState';
import {
  ALTERNATE_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';

describe('expressPresenter.getState', () => {
  const { supertest } = setup();

  it('should 400 without version header', async () => {
    await createTextState();
    await supertest
      .post(route)
      .set('Content-Type', ALTERNATE_CONTENT_TYPE)
      .query({ method: 'GET' })
      .send({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .expect(BAD_REQUEST);
  });

  it('should get when getting text', async () => {
    await createTextState();
    await supertest
      .post(route)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .set('Content-Type', ALTERNATE_CONTENT_TYPE)
      .query({ method: 'GET' })
      .send({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .expect(OK, TEST_CONTENT);
  });
});
