import { stringToStream } from '../../../utils/stringToStream';
import createJsonProfile from './createJsonProfile';
import { TEST_OBJECT_CONTENT } from './testValues';

export default async () => {
  await createJsonProfile({
    content: stringToStream(TEST_OBJECT_CONTENT),
  });
};
