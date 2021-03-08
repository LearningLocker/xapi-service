import { StatusCodes } from 'http-status-codes';
import assertDeleted from '../../../utils/assertDeleted';
import createJsonProfile from '../../../utils/createJsonProfile';
import createTextProfile from '../../../utils/createTextProfile';
import setup from '../utils/setup';
import deleteProfile from './utils/deleteProfile';

describe('expressPresenter.deleteProfile with existing profile', () => {
  setup();

  it('should delete when deleting text', async () => {
    await createTextProfile();
    await deleteProfile().expect(StatusCodes.NO_CONTENT);
    await assertDeleted();
  });

  it('should delete when deleting json', async () => {
    await createJsonProfile();
    await deleteProfile().expect(StatusCodes.NO_CONTENT);
    await assertDeleted();
  });
});
