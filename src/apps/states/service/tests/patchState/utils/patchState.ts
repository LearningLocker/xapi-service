import stringToStream from 'string-to-stream';
import PatchStateOptions from '../../../../serviceFactory/options/PatchStateOptions';
import service from '../../../../utils/testService';
import {
  JSON_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../../utils/testValues';

export default async (
  optsOverrides: Partial<PatchStateOptions> = {},
  content: string = TEST_OBJECT_CONTENT,
) => {
  await service.patchState({
    activityId: TEST_ACTIVITY_ID,
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    content: stringToStream(content),
    contentType: JSON_CONTENT_TYPE,
    registration: TEST_REGISTRATION,
    stateId: TEST_STATE_ID,
    ...optsOverrides,
  });
};
