import stringToStream from 'string-to-stream';
import ClientModel from '../models/ClientModel';
import service from './testService';
import {
  JSON_CONTENT_TYPE,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_PROFILE_ID,
} from './testValues';

export default async (client: ClientModel) => {
  await service.patchProfile({
    agent: TEST_MBOX_AGENT,
    client,
    content: stringToStream(TEST_OBJECT_CONTENT),
    contentType: JSON_CONTENT_TYPE,
    profileId: TEST_PROFILE_ID,
  });
};
