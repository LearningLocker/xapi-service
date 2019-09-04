import { Test } from 'supertest';
import { route, xapiHeaderVersion } from '../../../../utils/constants';
import {
  JSON_CONTENT_TYPE,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_PROFILE_ID,
} from '../../../../utils/testValues';
import supertest from '../../utils/supertest';

export default (
  optsOverrides: object = {},
  content: string = TEST_OBJECT_CONTENT,
  contentType: string = JSON_CONTENT_TYPE,
): Test => {
  return supertest
    .post(`${route}/profile`)
    .set('Content-Type', contentType)
    .set('X-Experience-API-Version', xapiHeaderVersion)
    .query({
      agent: JSON.stringify(TEST_MBOX_AGENT),
      profileId: TEST_PROFILE_ID,
      ...optsOverrides,
    })
    .send(content);
};
