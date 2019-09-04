import { NO_CONTENT } from 'http-status-codes';
import Agent from '../../../../models/Agent';
import getTestProfile from '../../../../utils/getTestProfile';
import { TEST_OBJECT_CONTENT } from '../../../../utils/testValues';
import patchProfile from './patchProfile';

export default async (
  agent: Agent,
  content: string = TEST_OBJECT_CONTENT,
) => {
  const getProfileResult = await getTestProfile({ agent });
  await patchProfile({ agent: JSON.stringify(agent) }, content)
    .set('If-Match', getProfileResult.etag)
    .expect(NO_CONTENT);
};
