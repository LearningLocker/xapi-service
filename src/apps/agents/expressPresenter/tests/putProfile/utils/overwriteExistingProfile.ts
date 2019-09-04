import { NO_CONTENT } from 'http-status-codes';
import Agent from '../../../../models/Agent';
import getTestProfile from '../../../../utils/getTestProfile';
import { TEST_CONTENT } from '../../../../utils/testValues';
import overwriteProfile from './overwriteProfile';

export default async (
  agent: Agent,
  content: string = TEST_CONTENT,
) => {
  const getProfileResult = await getTestProfile({ agent });
  await overwriteProfile({ agent: JSON.stringify(agent) }, content)
    .set('If-Match', getProfileResult.etag)
    .unset('If-None-Match')
    .expect(NO_CONTENT);
};
