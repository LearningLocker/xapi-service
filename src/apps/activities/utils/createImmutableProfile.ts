import stringToStream from 'string-to-stream';
import createTextProfile from './createTextProfile';
import {
  TEST_IMMUTABLE_ACTIVITY_ID,
  TEST_IMMUTABLE_CONTENT,
} from './testValues';

export default async () => {
  await createTextProfile({
    activityId: TEST_IMMUTABLE_ACTIVITY_ID,
    content: stringToStream(TEST_IMMUTABLE_CONTENT),
  });
};
