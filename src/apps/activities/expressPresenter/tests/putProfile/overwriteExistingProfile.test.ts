import assertImmutableProfile from '../../../utils/assertImmutableProfile';
import assertProfile from '../../../utils/assertProfile';
import createImmutableProfile from '../../../utils/createImmutableProfile';
import createTextProfile from '../../../utils/createTextProfile';
import {
  TEST_ACTIVITY_ID,
  TEST_IMMUTABLE_CONTENT,
 } from '../../../utils/testValues';
import setup from '../utils/setup';
import overwriteExistingProfile from './utils/overwriteExistingProfile';

describe('expressPresenter.putProfile with existing model', () => {
  setup();

  it('should overwrite model when overwriting an existing model', async () => {
    await createTextProfile();
    await overwriteExistingProfile(TEST_ACTIVITY_ID, TEST_IMMUTABLE_CONTENT);
    await assertProfile(TEST_IMMUTABLE_CONTENT);
  });

  it('should not overwrite non-matched models', async () => {
    await createTextProfile();
    await createImmutableProfile();
    await overwriteExistingProfile(TEST_ACTIVITY_ID);
    await assertImmutableProfile();
  });
});
