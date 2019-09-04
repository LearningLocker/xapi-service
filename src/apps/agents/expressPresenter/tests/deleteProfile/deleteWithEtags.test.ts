import { NO_CONTENT, PRECONDITION_FAILED } from 'http-status-codes';
import createTextProfile from '../../../utils/createTextProfile';
import getTestProfile from '../../../utils/getTestProfile';
import setup from '../utils/setup';
import deleteProfile from './utils/deleteProfile';

describe('expressPresenter.deleteProfile with etags', () => {
  setup();

  it('should allow deletion when using a correct etag', async () => {
    await createTextProfile();
    const getProfileResult = await getTestProfile();
    await deleteProfile()
      .set('If-Match', `"${getProfileResult.etag}"`)
      .expect(NO_CONTENT);
  });

  it('should throw precondition error when using an incorrect ifMatch', async () => {
    await createTextProfile();
    await deleteProfile()
      .set('If-Match', `"incorrect_etag"`)
      .expect(PRECONDITION_FAILED);
  });

  it('should allow deletion when not using an IfMatch', async () => {
    await createTextProfile();
    await deleteProfile().expect(NO_CONTENT);
  });
});
