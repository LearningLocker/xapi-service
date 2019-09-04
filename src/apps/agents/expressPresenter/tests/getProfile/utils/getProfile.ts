import { Test } from 'supertest';
import { route, xapiHeaderVersion } from '../../../../utils/constants';
import { TEST_MBOX_AGENT, TEST_PROFILE_ID } from '../../../../utils/testValues';
import supertest from '../../utils/supertest';

export default (optsOverrides: object = {}): Test => {
  return supertest
    .get(`${route}/profile`)
    .set('X-Experience-API-Version', xapiHeaderVersion)
    .query({
      agent: JSON.stringify(TEST_MBOX_AGENT),
      profileId: TEST_PROFILE_ID,
      ...optsOverrides,
    });
};
