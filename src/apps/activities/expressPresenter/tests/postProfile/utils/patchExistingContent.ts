import { Response } from 'supertest';
import { route, xapiHeaderVersion } from '../../../../utils/constants';
import service from '../../../../utils/testService';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_PROFILE_ID,
} from '../../../../utils/testValues';
import supertest from '../../utils/supertest';

export default async (
  content: string,
  contentType: string,
  expectedCode: number,
): Promise<Response> => {
  const getProfileResult = await service.getProfile({
    activityId: TEST_ACTIVITY_ID,
    client: TEST_CLIENT,
    profileId: TEST_PROFILE_ID,
  });
  return supertest
    .post(route)
    .set('Content-Type', contentType)
    .set('If-Match', `"${getProfileResult.etag}"`)
    .set('X-Experience-API-Version', xapiHeaderVersion)
    .query({
      activityId: TEST_ACTIVITY_ID,
      profileId: TEST_PROFILE_ID,
    })
    .send(content)
    .expect(expectedCode);
};
