import stringToStream from 'string-to-stream';
import PatchProfileOptions from '../../../../serviceFactory/options/PatchProfileOptions';
import service from '../../../../utils/testService';
import {
  JSON_CONTENT_TYPE,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_PROFILE_ID,
} from '../../../../utils/testValues';

export default async (
  optsOverrides: Partial<PatchProfileOptions> = {},
  content: string = TEST_OBJECT_CONTENT,
) => {
  await service.patchProfile({
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    content: stringToStream(content),
    contentType: JSON_CONTENT_TYPE,
    profileId: TEST_PROFILE_ID,
    ...optsOverrides,
  });
};
