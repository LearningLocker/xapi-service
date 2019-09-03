import { NO_CONTENT } from 'http-status-codes';
import assertState from '../../../utils/assertState';
import {
  TEST_CONTENT,
  TEST_OUTSIDE_ORG_TOKEN,
  TEST_OUTSIDE_STORE_TOKEN,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import overwriteState from './utils/overwriteState';

describe('expressPresenter.putState when outside client', () => {
  setup();

  const overwriteOutsideState = async (token: string) => {
    await overwriteState({}, 'unused_content')
      .set('Authorization', token)
      .expect(NO_CONTENT);
  };

  it('should not overwrite existing model when using a different organisation', async () => {
    await overwriteState().expect(NO_CONTENT);
    await overwriteOutsideState(TEST_OUTSIDE_ORG_TOKEN);
    await assertState(TEST_CONTENT);
  });

  it('should not overwrite existing model when using a different store', async () => {
    await overwriteState().expect(NO_CONTENT);
    await overwriteOutsideState(TEST_OUTSIDE_STORE_TOKEN);
    await assertState(TEST_CONTENT);
  });
});
