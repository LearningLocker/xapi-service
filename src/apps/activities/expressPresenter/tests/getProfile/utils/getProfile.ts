import { Test } from 'supertest';
import { route, xapiHeaderVersion } from '../../../../utils/constants';
import { TEST_ACTIVITY_ID, TEST_PROFILE_ID } from '../../../../utils/testValues';
import supertest from '../../utils/supertest';

export default (optsOverrides: object = {}): Test => {
  return supertest
    .get(route)
    .set('X-Experience-API-Version', xapiHeaderVersion)
    .query({
      activityId: TEST_ACTIVITY_ID,
      profileId: TEST_PROFILE_ID,
      ...optsOverrides,
    });
};
