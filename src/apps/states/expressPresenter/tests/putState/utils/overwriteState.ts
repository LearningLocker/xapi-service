import { Test } from 'supertest';
import { route, xapiHeaderVersion } from '../../../../utils/constants';
import {
  TEST_ACTIVITY_ID,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../../utils/testValues';
import supertest from '../../utils/supertest';

export default (
  optsOverrides: object = {},
  content: string = TEST_CONTENT,
  contentType: string = TEXT_CONTENT_TYPE,
  sendVersion = true,
): Test => {
  const activityId = TEST_ACTIVITY_ID;
  const stateId = TEST_STATE_ID;
  const agent = JSON.stringify(TEST_MBOX_AGENT);
  const registration = TEST_REGISTRATION;
  const req = supertest
    .put(route)
    .set('Content-Type', contentType);
  if (sendVersion) {
    req.set('X-Experience-API-Version', xapiHeaderVersion);
  }
  return req.query({
    activityId,
    agent,
    registration,
    stateId,
    ...optsOverrides,
  })
  .send(content);
};
