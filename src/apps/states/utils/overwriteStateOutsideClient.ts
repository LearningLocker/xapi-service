import stringToStream from 'string-to-stream';
import ClientModel from '../models/ClientModel';
import service from './testService';
import {
  TEST_ACTIVITY_ID,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
  TEXT_CONTENT_TYPE,
} from './testValues';

export default async (client: ClientModel) => {
  await service.overwriteState({
    activityId: TEST_ACTIVITY_ID,
    agent: TEST_MBOX_AGENT,
    client,
    content: stringToStream(TEST_CONTENT),
    contentType: TEXT_CONTENT_TYPE,
    registration: TEST_REGISTRATION,
    stateId: TEST_STATE_ID,
  });
};
