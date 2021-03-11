import { StatusCodes } from 'http-status-codes';
import createObjectProfile from '../../../utils/createObjectProfile';
import getTestProfile from '../../../utils/getTestProfile';
import setup from '../utils/setup';
import patchProfile from './utils/patchProfile';

describe('expressPresenter.postProfile with etags', () => {
  setup();

  it('should allow patches when using a correct etag', async () => {
    await createObjectProfile();
    const getProfileResult = await getTestProfile();
    await patchProfile().set('If-Match', getProfileResult.etag).expect(StatusCodes.NO_CONTENT);
  });

  it('should throw precondition error when using an incorrect ifMatch', async () => {
    await createObjectProfile();
    await patchProfile().set('If-Match', 'incorrect_etag').expect(StatusCodes.PRECONDITION_FAILED);
  });

  it('should throw precondition error when using an incorrect ifNoneMatch', async () => {
    await createObjectProfile();
    await patchProfile().set('If-None-Match', '*').expect(StatusCodes.PRECONDITION_FAILED);
  });

  it('should allow patch when not using an ifMatch or ifNoneMatch', async () => {
    await createObjectProfile();
    await patchProfile().expect(StatusCodes.NO_CONTENT);
  });

  it('should throw max etag error when using ifMatch and ifNoneMatch', async () => {
    await createObjectProfile();
    await patchProfile()
      .set('If-Match', 'incorrect_etag')
      .set('If-None-Match', '*')
      .expect(StatusCodes.BAD_REQUEST);
  });
});
