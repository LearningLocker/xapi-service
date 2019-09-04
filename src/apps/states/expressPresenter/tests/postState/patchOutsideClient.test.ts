import { NO_CONTENT } from 'http-status-codes';
import assertState from '../../../utils/assertState';
import {
  JSON_CONTENT_TYPE,
  TEST_OBJECT_CONTENT,
  TEST_OUTSIDE_ORG_TOKEN,
  TEST_OUTSIDE_STORE_TOKEN,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import patchContent from './utils/patchContent';
import patchState from './utils/patchState';

describe('expressPresenter.postState when outside client', () => {
  setup();

  const patchOutsideState = async (token: string) => {
    await patchState({}, '{"bar":2}')
      .set('Authorization', token)
      .expect(NO_CONTENT);
  };

  it('should not overwrite existing model when using a different organisation', async () => {
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await patchOutsideState(TEST_OUTSIDE_ORG_TOKEN);
    await assertState(TEST_OBJECT_CONTENT);
  });

  it('should not overwrite existing model when using a different store', async () => {
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await patchOutsideState(TEST_OUTSIDE_STORE_TOKEN);
    await assertState(TEST_OBJECT_CONTENT);
  });
});
