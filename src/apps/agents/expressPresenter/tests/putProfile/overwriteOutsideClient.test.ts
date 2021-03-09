import { StatusCodes } from 'http-status-codes';
import assertProfile from '../../../utils/assertProfile';
import {
  TEST_CONTENT,
  TEST_OUTSIDE_ORG_TOKEN,
  TEST_OUTSIDE_STORE_TOKEN,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import overwriteProfile from './utils/overwriteProfile';

describe('expressPresenter.putProfile when outside client', () => {
  setup();

  const overwriteOutsideProfile = async (token: string) => {
    await overwriteProfile({}, 'unused_content')
      .set('Authorization', token)
      .expect(StatusCodes.NO_CONTENT);
  };

  it('should not overwrite existing model when using a different organisation', async () => {
    await overwriteProfile().expect(StatusCodes.NO_CONTENT);
    await overwriteOutsideProfile(TEST_OUTSIDE_ORG_TOKEN);
    await assertProfile(TEST_CONTENT);
  });

  it('should not overwrite existing model when using a different store', async () => {
    await overwriteProfile().expect(StatusCodes.NO_CONTENT);
    await overwriteOutsideProfile(TEST_OUTSIDE_STORE_TOKEN);
    await assertProfile(TEST_CONTENT);
  });
});
