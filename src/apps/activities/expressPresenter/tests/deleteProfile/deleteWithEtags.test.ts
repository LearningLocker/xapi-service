import { StatusCodes } from 'http-status-codes';
import streamToString from 'stream-to-string';
import createTextProfile from '../../../utils/createTextProfile';
import getTestProfile from '../../../utils/getTestProfile';
import setup from '../utils/setup';
import deleteProfile from './utils/deleteProfile';

describe('expressPresenter.deleteProfile with etags', () => {
  setup();

  it('should allow deletion when using a correct etag', async () => {
    await createTextProfile();
    const getProfileResult = await getTestProfile();
    // The getTestProfile starts a stream.
    // Without consuming the stream we delete the content mid-stream.
    // This causes flaky errors in our tests.
    await streamToString(getProfileResult.content);
    await deleteProfile()
      .set('If-Match', `"${getProfileResult.etag}"`)
      .expect(StatusCodes.NO_CONTENT);
  });

  it('should throw precondition error when using an incorrect ifMatch', async () => {
    await createTextProfile();
    await deleteProfile()
      .set('If-Match', `"incorrect_etag"`)
      .expect(StatusCodes.PRECONDITION_FAILED);
  });

  it('should allow deletion when not using an IfMatch', async () => {
    await createTextProfile();
    await deleteProfile().expect(StatusCodes.NO_CONTENT);
  });
});
