import Forbidden from 'jscommons/dist/errors/Forbidden';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { TEST_INVALID_SCOPE_CLIENT, TEST_VALID_SCOPE_CLIENT } from '../../../utils/testValues';
import setup from '../utils/setup';
import getFullAgent from './utils/getFullAgent';

describe('getFullAgent with scopes', () => {
  setup();

  it('should throw forbidden error when using invalid scope', async () => {
    const promise = getFullAgent({
      client: TEST_INVALID_SCOPE_CLIENT,
    });
    await assertError(Forbidden, promise);
  });

  it('should not throw error when using valid scopes', async () => {
    await getFullAgent({
      client: TEST_VALID_SCOPE_CLIENT,
    });
  });
});
