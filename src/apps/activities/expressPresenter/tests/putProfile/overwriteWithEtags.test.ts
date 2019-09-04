import { BAD_REQUEST, CONFLICT, NO_CONTENT, PRECONDITION_FAILED } from 'http-status-codes';
import createTextProfile from '../../../utils/createTextProfile';
import getTestProfile from '../../../utils/getTestProfile';
import setup from '../utils/setup';
import overwriteProfile from './utils/overwriteProfile';

describe('expressPresenter.putProfile with etags', () => {
  setup();

  it('should allow overwrites when using a correct etag', async () => {
    await createTextProfile();
    const getProfileResult = await getTestProfile();
    await overwriteProfile()
      .set('If-Match', getProfileResult.etag)
      .unset('If-None-Match')
      .expect(NO_CONTENT);
  });

  it('should throw precondition error when using an incorrect ifMatch', async () => {
    await createTextProfile();
    await overwriteProfile()
      .set('If-Match', 'incorrect_etag')
      .unset('If-None-Match')
      .expect(PRECONDITION_FAILED);
  });

  it('should throw precondition error when using an incorrect ifNoneMatch', async () => {
    await createTextProfile();
    await overwriteProfile()
      .set('If-None-Match', '*')
      .expect(PRECONDITION_FAILED);
  });

  it('should throw conflict error when not using ifMatch or ifNoneMatch', async () => {
    await createTextProfile();
    await overwriteProfile()
      .unset('If-None-Match')
      .expect(CONFLICT);
  });

  it('should throw max etag error when using ifMatch and ifNoneMatch', async () => {
    await createTextProfile();
    await overwriteProfile()
      .set('If-Match', 'incorrect_etag')
      .set('If-None-Match', '*')
      .expect(BAD_REQUEST);
  });

  it('should throw missing etags error when not using ifMatch and ifNoneMatch', async () => {
    await overwriteProfile()
      .unset('If-None-Match')
      .expect(BAD_REQUEST);
  });
});
