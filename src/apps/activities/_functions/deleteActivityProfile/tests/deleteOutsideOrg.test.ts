import setup from '../../../expressPresenter/tests/utils/setup';
import overwriteProfileOutsideClient from '../../../utils/overwriteProfileOutsideClient';
import patchProfileOutsideClient from '../../../utils/patchProfileOutsideClient';
import { TEST_CLIENT_OUTSIDE_ORG } from '../../../utils/testValues';
import assertOutsideClient from './utils/assertOutsideClient';

describe('expressPresenter.deleteProfile outside the organisation', () => {
  setup();

  it('should error when deleting a overwritten model', async () => {
    await overwriteProfileOutsideClient(TEST_CLIENT_OUTSIDE_ORG);
    await assertOutsideClient();
  });

  it('should error when deleting a patched model', async () => {
    await patchProfileOutsideClient(TEST_CLIENT_OUTSIDE_ORG);
    await assertOutsideClient();
  });
});
