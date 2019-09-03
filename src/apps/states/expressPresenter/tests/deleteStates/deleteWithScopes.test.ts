import { FORBIDDEN, NO_CONTENT } from 'http-status-codes';
import {
  TEST_EXPIRED_ORG_TOKEN,
  TEST_INVALID_SCOPE_TOKEN,
  TEST_UNTRUSTED_TOKEN,
  TEST_VALID_SCOPE_TOKEN,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import deleteStates from './utils/deleteStates';

describe('expressPresenter.deleteStates with scopes', () => {
  setup();

  it('should throw forbidden error when using invalid scope', async () => {
    await deleteStates()
      .set('Authorization', TEST_INVALID_SCOPE_TOKEN)
      .expect(FORBIDDEN);
  });

  it('should not throw error when using expired client', async () => {
    await deleteStates()
      .set('Authorization', TEST_EXPIRED_ORG_TOKEN)
      .expect(FORBIDDEN);
  });

  it('should throw forbidden error when using untrusted client', async () => {
    await deleteStates()
      .set('Authorization', TEST_UNTRUSTED_TOKEN)
      .expect(FORBIDDEN);
  });

  it('should not throw error when using valid scopes', async () => {
    await deleteStates()
      .set('Authorization', TEST_VALID_SCOPE_TOKEN)
      .expect(NO_CONTENT);
  });
});
