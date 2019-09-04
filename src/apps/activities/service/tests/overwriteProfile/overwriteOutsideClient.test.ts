import assertProfile from '../../../utils/assertProfile';
import overwriteProfileOutsideClient from '../../../utils/overwriteProfileOutsideClient';
import {
  TEST_CLIENT_OUTSIDE_ORG,
  TEST_CLIENT_OUTSIDE_STORE,
  TEST_CONTENT,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import overwriteProfile from './utils/overwriteProfile';

describe('overwriteProfile when outside client', () => {
  setup();

  it('should not overwrite existing model when using a different organisation', async () => {
    await overwriteProfile({}, TEST_CONTENT);
    await overwriteProfileOutsideClient(TEST_CLIENT_OUTSIDE_ORG);
    await assertProfile(TEST_CONTENT);
  });

  it('should not overwrite existing model when using a different store', async () => {
    await overwriteProfile({}, TEST_CONTENT);
    await overwriteProfileOutsideClient(TEST_CLIENT_OUTSIDE_STORE);
    await assertProfile(TEST_CONTENT);
  });
});
