import { NO_CONTENT } from 'http-status-codes';
import assertProfile from '../../../utils/assertProfile';
import {
  JSON_CONTENT_TYPE,
  TEST_OBJECT_CONTENT,
  TEST_OBJECT_PATCH_CONTENT,
  TEST_OUTSIDE_ORG_TOKEN,
  TEST_OUTSIDE_STORE_TOKEN,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import patchContent from './utils/patchContent';
import patchProfile from './utils/patchProfile';

describe('expressPresenter.postProfile when outside client', () => {
  setup();

  const patchOutsideClient = async (token: string) => {
    await patchProfile({}, TEST_OBJECT_PATCH_CONTENT)
      .set('Authorization', token)
      .expect(NO_CONTENT);
  };

  it('should not overwrite existing model when using a different organisation', async () => {
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await patchOutsideClient(TEST_OUTSIDE_ORG_TOKEN);
    await assertProfile(TEST_OBJECT_CONTENT);
  });

  it('should not overwrite existing model when using a different store', async () => {
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await patchOutsideClient(TEST_OUTSIDE_STORE_TOKEN);
    await assertProfile(TEST_OBJECT_CONTENT);
  });
});
