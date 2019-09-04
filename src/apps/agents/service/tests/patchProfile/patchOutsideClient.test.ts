import ClientModel from '../../../models/ClientModel';
import assertProfile from '../../../utils/assertProfile';
import {
  TEST_CLIENT_OUTSIDE_ORG,
  TEST_CLIENT_OUTSIDE_STORE,
  TEST_OBJECT_CONTENT,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import patchProfile from './utils/patchProfile';

describe('patchProfile when outside client', () => {
  setup();

  const patchOutsideProfile = async (client: ClientModel) => {
    await patchProfile({ client }, '{"bar":2}');
  };

  it('should not overwrite existing model when using a different organisation', async () => {
    await patchProfile();
    await patchOutsideProfile(TEST_CLIENT_OUTSIDE_ORG);
    await assertProfile(TEST_OBJECT_CONTENT);
  });

  it('should not overwrite existing model when using a different store', async () => {
    await patchProfile();
    await patchOutsideProfile(TEST_CLIENT_OUTSIDE_STORE);
    await assertProfile(TEST_OBJECT_CONTENT);
  });
});
