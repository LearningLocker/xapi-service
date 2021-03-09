import { Test } from 'supertest';
import { route, xapiHeaderVersion } from '../../../../utils/constants';
import {
  TEST_ACTIVITY_ID,
  TEST_CONTENT,
  TEST_PROFILE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../../utils/testValues';
import supertest from '../../utils/supertest';

export default (
  optsOverrides: Record<string, unknown> = {},
  content: string = TEST_CONTENT,
): Test => {
  return supertest
    .put(route)
    .set('Content-Type', TEXT_CONTENT_TYPE)
    .set('If-None-Match', '*')
    .set('X-Experience-API-Version', xapiHeaderVersion)
    .query({
      activityId: TEST_ACTIVITY_ID,
      profileId: TEST_PROFILE_ID,
      ...optsOverrides,
    })
    .send(content);
};
