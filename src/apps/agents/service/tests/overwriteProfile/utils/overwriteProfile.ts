import stringToStream from 'string-to-stream';
import OverwriteProfileOptions from '../../../../serviceFactory/options/OverwriteProfileOptions';
import service from '../../../../utils/testService';
import {
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_PROFILE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../../utils/testValues';

export default async (
  optsOverrides: Partial<OverwriteProfileOptions> = {},
  content: string = TEST_CONTENT,
) => {
  await service.overwriteProfile({
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    content: stringToStream(content),
    contentType: TEXT_CONTENT_TYPE,
    ifNoneMatch: '*',
    profileId: TEST_PROFILE_ID,
    ...optsOverrides,
  });
};
