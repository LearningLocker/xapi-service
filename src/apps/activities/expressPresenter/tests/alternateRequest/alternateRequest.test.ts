import { BAD_REQUEST, OK } from 'http-status-codes';
import { stringify as createQueryString } from 'query-string';
import { route, xapiHeaderVersion } from '../../../utils/constants';
import { ALTERNATE_CONTENT_TYPE, TEST_ACTIVITY_ID } from '../../../utils/testValues';
import setup from '../utils/setup';

describe('expressPresenter using the alternate request syntax', () => {
  const { supertest } = setup();

  it('should return error when using an invalid method', async () => {
    await supertest
      .post(route)
      .set('Content-Type', ALTERNATE_CONTENT_TYPE)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .query({ method: 'invalid_method' })
      .send({
        activityId: TEST_ACTIVITY_ID,
      })
      .expect(BAD_REQUEST);
  });

  it('should not error when using an invalid content type', async () => {
    await supertest
      .post(route)
      .set('Content-Type', 'invalid_content_type')
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .query({ method: 'GET' })
      .send(createQueryString({
        activityId: TEST_ACTIVITY_ID,
      }))
      .expect(OK, []);
  });
});
