import Forbidden from 'jscommons/dist/errors/Forbidden';
import assertError from 'jscommons/dist/tests/utils/assertError';
import setup from '../utils/setup';
import {
  TEST_ACTIVITY_ID,
  TEST_ALLOWED_CLIENT,
  TEST_FORBIDDEN_CLIENT,
} from './utils/testValues';

describe('getFullActivity with scopes', () => {
  const service = setup();

  it('should not throw an error when using valid scopes', async () => {
    await service.getFullActivity({
      activityId: TEST_ACTIVITY_ID,
      client: TEST_ALLOWED_CLIENT,
    });
  });

  it('should throw an error when using invalid scopes', async () => {
    const promise = service.getFullActivity({
      activityId: TEST_ACTIVITY_ID,
      client: TEST_FORBIDDEN_CLIENT,
    });
    await assertError(Forbidden, promise);
  });
});
