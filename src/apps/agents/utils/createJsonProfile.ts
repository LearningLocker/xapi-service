import stringToStream from 'string-to-stream';
import OverwriteProfileOptions from '../serviceFactory/options/OverwriteProfileOptions';
import createTextProfile from './createTextProfile';
import { JSON_CONTENT_TYPE, TEST_JSON_CONTENT } from './testValues';

export default async (optsOverrides: Partial<OverwriteProfileOptions> = {}) => {
  await createTextProfile({
    content: stringToStream(TEST_JSON_CONTENT),
    contentType: JSON_CONTENT_TYPE,
    ...optsOverrides,
  });
};
