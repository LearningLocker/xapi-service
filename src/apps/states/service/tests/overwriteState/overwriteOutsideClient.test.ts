import stringToStream from 'string-to-stream';
import ClientModel from '../../../models/ClientModel';
import assertState from '../../../utils/assertState';
import {
  TEST_CLIENT_OUTSIDE_ORG,
  TEST_CLIENT_OUTSIDE_STORE,
  TEST_CONTENT,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import overwriteState from './utils/overwriteState';

describe('overwriteState when outside client', () => {
  setup();

  const overwriteOutsideState = async (client: ClientModel) => {
    const content = stringToStream('unused_content');
    await overwriteState({ client, content });
  };

  it('should not overwrite existing model when using a different organisation', async () => {
    await overwriteState();
    await overwriteOutsideState(TEST_CLIENT_OUTSIDE_ORG);
    await assertState(TEST_CONTENT);
  });

  it('should not overwrite existing model when using a different store', async () => {
    await overwriteState();
    await overwriteOutsideState(TEST_CLIENT_OUTSIDE_STORE);
    await assertState(TEST_CONTENT);
  });
});
