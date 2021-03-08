import { StatusCodes } from 'http-status-codes';
import assertProfile from '../../../utils/assertProfile';
import { route, xapiHeaderVersion } from '../../../utils/constants';
import {
  JSON_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_OBJECT_CONTENT,
  TEST_PROFILE_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';

// These are regression tests for LearningLocker/learninglocker#999.
describe(__filename, () => {
  const { supertest } = setup();

  it('should not error when using a charset for JSON ', async () => {
    await supertest
      .put(route)
      .set('Content-Type', `${JSON_CONTENT_TYPE}; charset=UTF-8`)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .set('If-None-Match', '*')
      .query({
        activityId: TEST_ACTIVITY_ID,
        profileId: TEST_PROFILE_ID,
      })
      .send(TEST_OBJECT_CONTENT)
      .expect(StatusCodes.NO_CONTENT);
    await assertProfile(TEST_OBJECT_CONTENT);
  });
});
