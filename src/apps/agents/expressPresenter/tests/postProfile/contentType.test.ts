import { NO_CONTENT } from 'http-status-codes';
import assertProfile from '../../../utils/assertProfile';
import { route, xapiHeaderVersion } from '../../../utils/constants';
import {
  ALTERNATE_CONTENT_TYPE,
  JSON_CONTENT_TYPE,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_PROFILE_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';

// These are regression tests for LearningLocker/learninglocker#999.
describe(__filename, () => {
  const { supertest } = setup();

  it('should not error when using a charset for JSON ', async () => {
    await supertest
      .post(`${route}/profile`)
      .set('Content-Type', `${JSON_CONTENT_TYPE}; charset=UTF-8`)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .set('If-None-Match', '*')
      .query({
        agent: JSON.stringify(TEST_MBOX_AGENT),
        profileId: TEST_PROFILE_ID,
      })
      .send(TEST_OBJECT_CONTENT)
      .expect(NO_CONTENT);
    await assertProfile(TEST_OBJECT_CONTENT);
  });

  it('should not error when using a charset for alternate requests ', async () => {
    await supertest
      .post(`${route}/profile`)
      .set('Content-Type', `${ALTERNATE_CONTENT_TYPE}; charset=UTF-8`)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .query({
        method: 'POST',
      })
      .send({
        'Content-Type': JSON_CONTENT_TYPE,
        'If-None-Match': '*',
        agent: JSON.stringify(TEST_MBOX_AGENT),
        content: TEST_OBJECT_CONTENT,
        profileId: TEST_PROFILE_ID,
      })
      .expect(NO_CONTENT);
    await assertProfile(TEST_OBJECT_CONTENT);
  });
});
