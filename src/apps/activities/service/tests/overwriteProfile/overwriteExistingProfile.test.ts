import assertImmutableProfile from '../../../utils/assertImmutableProfile';
import createImmutableProfile from '../../../utils/createImmutableProfile';
import setup from '../utils/setup';
import overwriteProfile from './utils/overwriteProfile';

describe('overwriteProfile with existing model', () => {
  setup();

  // Etag tests are testing overwriting existing models.

  it('should not overwrite non-matched models', async () => {
    await createImmutableProfile();
    await overwriteProfile();
    await assertImmutableProfile();
  });
});
