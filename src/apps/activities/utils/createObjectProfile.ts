import stringToStream from 'string-to-stream';
import OverwriteProfileOptions from '../serviceFactory/options/OverwriteProfileOptions';
import createJsonProfile from './createJsonProfile';
import { TEST_OBJECT_CONTENT } from './testValues';

export default async (optsOverrides: Partial<OverwriteProfileOptions> = {}) => {
  await createJsonProfile({
    content: stringToStream(TEST_OBJECT_CONTENT),
    ...optsOverrides,
  });
};
