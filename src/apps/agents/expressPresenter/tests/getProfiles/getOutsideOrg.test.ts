import overwriteProfileOutsideClient from '../../../utils/overwriteProfileOutsideClient';
import patchProfileOutsideClient from '../../../utils/patchProfileOutsideClient';
import { TEST_CLIENT_OUTSIDE_ORG } from '../../../utils/testValues';
import setup from '../utils/setup';
import assertOutsideClient from './utils/assertOutsideClient';

describe('expressPresenter.getProfiles outside the organisation', () => {
  setup();

  it('should return no profile ids when getting a overwritten model', async () => {
    await overwriteProfileOutsideClient(TEST_CLIENT_OUTSIDE_ORG);
    await assertOutsideClient();
  });

  it('should return no profile ids when getting a patched model', async () => {
    await patchProfileOutsideClient(TEST_CLIENT_OUTSIDE_ORG);
    await assertOutsideClient();
  });
});
