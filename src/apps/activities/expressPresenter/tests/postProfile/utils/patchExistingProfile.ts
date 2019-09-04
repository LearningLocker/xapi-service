import { NO_CONTENT } from 'http-status-codes';
import getTestProfile from '../../../../utils/getTestProfile';
import { TEST_OBJECT_CONTENT } from '../../../../utils/testValues';
import patchProfile from './patchProfile';

export default async (
  activityId: string,
  content: string = TEST_OBJECT_CONTENT,
) => {
  const getProfileResult = await getTestProfile({ activityId });
  await patchProfile({ activityId }, content)
    .set('If-Match', getProfileResult.etag)
    .expect(NO_CONTENT);
};
