import { Test } from 'supertest';
import Agent from '../../../../models/Agent';
import { route, xapiHeaderVersion } from '../../../../utils/constants';
import {
  TEST_MBOX_AGENT,
} from '../../../../utils/testValues';
import supertest from '../../utils/supertest';

export default (agent: Agent = TEST_MBOX_AGENT): Test => {
  return supertest
    .get(route)
    .set('X-Experience-API-Version', xapiHeaderVersion)
    .query({
      agent: JSON.stringify(agent),
    });
};
