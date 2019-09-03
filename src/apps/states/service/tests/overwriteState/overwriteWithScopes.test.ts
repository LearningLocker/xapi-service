import Forbidden from 'jscommons/dist/errors/Forbidden';
import assertError from 'jscommons/dist/tests/utils/assertError';
import {
  TEST_INVALID_SCOPE_CLIENT,
  TEST_VALID_SCOPE_CLIENT,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import overwriteState from './utils/overwriteState';

describe('overwriteState with scopes', () => {
  setup();

  it('should throw forbidden error when using invalid scope', async () => {
    const promise = overwriteState({ client: TEST_INVALID_SCOPE_CLIENT });
    await assertError(Forbidden, promise);
  });

  it('should not throw an error when using valid scopes', async () => {
    await overwriteState({ client: TEST_VALID_SCOPE_CLIENT });
  });
});
