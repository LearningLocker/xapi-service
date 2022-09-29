import { stringToStream } from '../../../utils/stringToStream';
import OverwriteStateOptions from '../serviceFactory/options/OverwriteStateOptions';
import service from './testService';
import {
  JSON_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from './testValues';

export default async (optsOverrides: Partial<OverwriteStateOptions> = {}) => {
  await service.overwriteState({
    activityId: TEST_ACTIVITY_ID,
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    content: stringToStream(TEST_OBJECT_CONTENT),
    contentType: JSON_CONTENT_TYPE,
    registration: TEST_REGISTRATION,
    stateId: TEST_STATE_ID,
    ...optsOverrides,
  });
};
