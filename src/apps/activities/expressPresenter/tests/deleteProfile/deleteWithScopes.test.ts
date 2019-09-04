import { FORBIDDEN, NO_CONTENT } from 'http-status-codes';
import { TEST_EXPIRED_ORG_TOKEN, TEST_UNTRUSTED_TOKEN } from '../../../utils/testValues';
import setup from '../utils/setup';
import deleteProfile from './utils/deleteProfile';

describe('expressPresenter.deleteProfile with scopes', () => {
  setup();

  it('should throw forbidden error when using invalid scope', async () => {
    await deleteProfile().set('Authorization', 'invalid_scope_client').expect(FORBIDDEN);
  });

  it('should throw forbidden error when using expired client', async () => {
    await deleteProfile().set('Authorization', TEST_EXPIRED_ORG_TOKEN).expect(FORBIDDEN);
  });

  it('should throw forbidden error when using untrusted client', async () => {
    await deleteProfile().set('Authorization', TEST_UNTRUSTED_TOKEN).expect(FORBIDDEN);
  });

  it('should not throw an error when using valid scopes', async () => {
    await deleteProfile().set('Authorization', 'valid_scope_client').expect(NO_CONTENT);
  });
});
