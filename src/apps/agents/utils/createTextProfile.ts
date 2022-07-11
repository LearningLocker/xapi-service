import { stringToStream } from '../../../utils/stringToStream';
import OverwriteProfileOptions from '../serviceFactory/options/OverwriteProfileOptions';
import service from './testService';
import {
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_PROFILE_ID,
  TEXT_CONTENT_TYPE,
} from './testValues';

export default async (optsOverrides: Partial<OverwriteProfileOptions> = {}) => {
  await service.overwriteProfile({
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    content: stringToStream(TEST_CONTENT),
    contentType: TEXT_CONTENT_TYPE,
    ifNoneMatch: '*',
    profileId: TEST_PROFILE_ID,
    ...optsOverrides,
  });
};
