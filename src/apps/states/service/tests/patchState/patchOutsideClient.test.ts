import ClientModel from '../../../models/ClientModel';
import assertState from '../../../utils/assertState';
import {
  TEST_CLIENT_OUTSIDE_ORG,
  TEST_CLIENT_OUTSIDE_STORE,
  TEST_OBJECT_CONTENT,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import patchState from './utils/patchState';

describe('patchState when outside client', () => {
  setup();

  const patchOutsideState = async (client: ClientModel) => {
    await patchState({ client }, '{"bar":2}');
  };

  it('should not overwrite existing model when using a different organisation', async () => {
    await patchState();
    await patchOutsideState(TEST_CLIENT_OUTSIDE_ORG);
    await assertState(TEST_OBJECT_CONTENT);
  });

  it('should not overwrite existing model when using a different store', async () => {
    await patchState();
    await patchOutsideState(TEST_CLIENT_OUTSIDE_STORE);
    await assertState(TEST_OBJECT_CONTENT);
  });
});
