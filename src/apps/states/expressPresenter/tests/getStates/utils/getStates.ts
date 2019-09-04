import { Test } from 'supertest';
import { route, xapiHeaderVersion } from '../../../../utils/constants';
import {
  TEST_ACTIVITY_ID,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
} from '../../../../utils/testValues';
import supertest from '../../utils/supertest';

export default (optsOverrides: object = {}, sendVersion = true): Test => {
  const activityId = TEST_ACTIVITY_ID;
  const agent = JSON.stringify(TEST_MBOX_AGENT);
  const registration = TEST_REGISTRATION;
  const req = supertest.get(route);
  if (sendVersion) {
    req.set('X-Experience-API-Version', xapiHeaderVersion);
  }
  return req.query({
    activityId,
    agent,
    registration,
    ...optsOverrides,
  });
};
