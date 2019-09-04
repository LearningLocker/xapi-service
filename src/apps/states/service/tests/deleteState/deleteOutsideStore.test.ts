import overwriteStateOutsideClient from '../../../utils/overwriteStateOutsideClient';
import patchStateOutsideClient from '../../../utils/patchStateOutsideClient';
import {
  TEST_CLIENT_OUTSIDE_STORE,
  TEST_CONTENT,
  TEST_OBJECT_CONTENT,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import assertOutsideClient from './utils/assertOutsideClient';

describe('deleteState outside the store', () => {
  setup();

  it('should error when deleting a overwritten model', async () => {
    await overwriteStateOutsideClient(TEST_CLIENT_OUTSIDE_STORE);
    await assertOutsideClient(TEST_CLIENT_OUTSIDE_STORE, TEST_CONTENT);
  });

  it('should error when deleting a patched model', async () => {
    await patchStateOutsideClient(TEST_CLIENT_OUTSIDE_STORE);
    await assertOutsideClient(TEST_CLIENT_OUTSIDE_STORE, TEST_OBJECT_CONTENT);
  });
});
