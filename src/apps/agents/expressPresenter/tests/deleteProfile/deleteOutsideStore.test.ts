import overwriteProfileOutsideClient from '../../../utils/overwriteProfileOutsideClient';
import patchProfileOutsideClient from '../../../utils/patchProfileOutsideClient';
import {
  TEST_CLIENT_OUTSIDE_STORE,
  TEST_CONTENT,
  TEST_OBJECT_CONTENT,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import assertOutsideClient from './utils/assertOutsideClient';

describe('expressPresenter.deleteProfile outside the store', () => {
  setup();

  it('should error when deleting a overwritten model', async () => {
    await overwriteProfileOutsideClient(TEST_CLIENT_OUTSIDE_STORE);
    await assertOutsideClient(TEST_CLIENT_OUTSIDE_STORE, TEST_CONTENT);
  });

  it('should error when deleting a patched model', async () => {
    await patchProfileOutsideClient(TEST_CLIENT_OUTSIDE_STORE);
    await assertOutsideClient(TEST_CLIENT_OUTSIDE_STORE, TEST_OBJECT_CONTENT);
  });
});
