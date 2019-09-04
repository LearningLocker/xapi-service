import stringToStream from 'string-to-stream';
import ClientModel from '../../../models/ClientModel';
import assertProfile from '../../../utils/assertProfile';
import {
  TEST_CLIENT_OUTSIDE_ORG,
  TEST_CLIENT_OUTSIDE_STORE,
  TEST_CONTENT,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import overwriteProfile from './utils/overwriteProfile';

describe('overwriteProfile when outside client', () => {
  setup();

  const overwriteOutsideProfile = async (client: ClientModel) => {
    const content = stringToStream('unused_content');
    await overwriteProfile({ client, content });
  };

  it('should not overwrite existing model when using a different organisation', async () => {
    await overwriteProfile();
    await overwriteOutsideProfile(TEST_CLIENT_OUTSIDE_ORG);
    await assertProfile(TEST_CONTENT);
  });

  it('should not overwrite existing model when using a different store', async () => {
    await overwriteProfile();
    await overwriteOutsideProfile(TEST_CLIENT_OUTSIDE_STORE);
    await assertProfile(TEST_CONTENT);
  });
});
