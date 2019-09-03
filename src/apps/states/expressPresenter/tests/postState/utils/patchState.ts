import { Test } from 'supertest';
import { route, xapiHeaderVersion } from '../../../../utils/constants';
import {
  JSON_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../../utils/testValues';
import supertest from '../../utils/supertest';

export default (
  optsOverrides: object = {},
  content: string = TEST_OBJECT_CONTENT,
  contentType: string = JSON_CONTENT_TYPE,
  sendVersion = true,
): Test => {
  const req = supertest
    .post(route)
    .set('Content-Type', contentType);
  if (sendVersion) {
    req.set('X-Experience-API-Version', xapiHeaderVersion);
  }
  return req.query({
      activityId: TEST_ACTIVITY_ID,
      agent: JSON.stringify(TEST_MBOX_AGENT),
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
      ...optsOverrides,
    })
    .send(content);
};
