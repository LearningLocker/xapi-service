import Unauthorised from 'jscommons/dist/errors/Unauthorised';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { TEST_MISSING_TOKEN } from '../utils/testValues';
import setup from './utils/setup';

describe('getClient using non-existing model', () => {
  const service = setup();

  it('should error when getting without clients', async () => {
    const promise = service.getClient({ authToken: TEST_MISSING_TOKEN });
    await assertError(Unauthorised, promise);
  });
});
