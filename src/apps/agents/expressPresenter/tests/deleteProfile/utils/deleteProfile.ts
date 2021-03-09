import { Test } from 'supertest';
import { route, xapiHeaderVersion } from '../../../../utils/constants';
import { TEST_MBOX_AGENT, TEST_PROFILE_ID } from '../../../../utils/testValues';
import supertest from '../../utils/supertest';

const options = {
  agent: JSON.stringify(TEST_MBOX_AGENT),
  profileId: TEST_PROFILE_ID,
};

export default (optsOverrides: Record<string, unknown> = {}): Test => {
  return supertest
    .delete(`${route}/profile`)
    .set('X-Experience-API-Version', xapiHeaderVersion)
    .query({
      ...options,
      ...optsOverrides,
    });
};
