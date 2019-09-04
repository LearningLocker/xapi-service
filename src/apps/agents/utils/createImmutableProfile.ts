import stringToStream from 'string-to-stream';
import createTextProfile from './createTextProfile';
import { TEST_IMMUTABLE_AGENT, TEST_IMMUTABLE_CONTENT } from './testValues';

export default async () => {
  await createTextProfile({
    agent: TEST_IMMUTABLE_AGENT,
    content: stringToStream(TEST_IMMUTABLE_CONTENT),
  });
};
