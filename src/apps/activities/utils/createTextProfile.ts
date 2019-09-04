import stringToStream from 'string-to-stream';
import OverwriteProfileOptions from '../serviceFactory/options/OverwriteProfileOptions';
import service from './testService';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_PROFILE_ID,
  TEXT_CONTENT_TYPE,
} from './testValues';

export default async (optsOverrides: Partial<OverwriteProfileOptions> = {}) => {
  await service.overwriteProfile({
    activityId: TEST_ACTIVITY_ID,
    client: TEST_CLIENT,
    content: stringToStream(TEST_CONTENT),
    contentType: TEXT_CONTENT_TYPE,
    ifNoneMatch: '*',
    profileId: TEST_PROFILE_ID,
    ...optsOverrides,
  });
};
