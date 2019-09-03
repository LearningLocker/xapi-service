import { NO_CONTENT } from 'http-status-codes';
import assertImmutableState from '../../../utils/assertImmutableState';
import createImmutableState from '../../../utils/createImmutableState';
import { TEST_CLIENT_OUTSIDE_STORE } from '../../../utils/testValues';
import setup from '../utils/setup';
import deleteStates from './utils/deleteStates';

describe('expressPresenter.deleteStates outside the store', () => {
  setup();

  it('should error when deleting a overwritten model', async () => {
    await createImmutableState({ client: TEST_CLIENT_OUTSIDE_STORE });
    await deleteStates().expect(NO_CONTENT);
    await assertImmutableState(
      { client: TEST_CLIENT_OUTSIDE_STORE },
      { client: TEST_CLIENT_OUTSIDE_STORE },
    );
  });
});
