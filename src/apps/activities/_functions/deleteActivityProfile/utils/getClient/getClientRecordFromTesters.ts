import NoModel from 'jscommons/dist/errors/NoModel';
import ExpiredClientError from '../../../../errors/ExpiredClientError';
import UntrustedClientError from '../../../../errors/UntrustedClientError';
import ClientModel from '../../../../models/ClientModel';
import {
  TEST_CLIENT,
  TEST_CLIENT_OUTSIDE_ORG,
  TEST_CLIENT_OUTSIDE_STORE,
  TEST_EXPIRED_ORG_TOKEN,
  TEST_INVALID_SCOPE_CLIENT,
  TEST_INVALID_SCOPE_TOKEN,
  TEST_MISSING_TOKEN,
  TEST_OUTSIDE_ORG_TOKEN,
  TEST_OUTSIDE_STORE_TOKEN,
  TEST_UNTRUSTED_TOKEN,
  TEST_VALID_SCOPE_CLIENT,
  TEST_VALID_SCOPE_TOKEN,
} from '../../../../utils/testValues';

export async function getClientRecordFromTesters(authToken: string): Promise<ClientModel> {
  switch (authToken) {
    case TEST_INVALID_SCOPE_TOKEN:
      return TEST_INVALID_SCOPE_CLIENT;
    case TEST_VALID_SCOPE_TOKEN:
      return TEST_VALID_SCOPE_CLIENT;
    case TEST_OUTSIDE_ORG_TOKEN:
      return TEST_CLIENT_OUTSIDE_ORG;
    case TEST_OUTSIDE_STORE_TOKEN:
      return TEST_CLIENT_OUTSIDE_STORE;
    case TEST_UNTRUSTED_TOKEN:
      throw new UntrustedClientError();
    case TEST_EXPIRED_ORG_TOKEN:
      throw new ExpiredClientError();
    case TEST_MISSING_TOKEN:
      throw new NoModel('Client');
    default:
      return TEST_CLIENT;
  }
}
