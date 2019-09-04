import assertError from 'jscommons/dist/tests/utils/assertError';
import IfMatch from '../../../errors/IfMatch';
import IfNoneMatch from '../../../errors/IfNoneMatch';
import MaxEtags from '../../../errors/MaxEtags';
import createObjectProfile from '../../../utils/createObjectProfile';
import getTestProfile from '../../../utils/getTestProfile';
import setup from '../utils/setup';
import patchProfile from './utils/patchProfile';

describe('patchProfile with etags', () => {
  setup();

  it('should allow patches when using a correct etag', async () => {
    await createObjectProfile();
    const getProfileResult = await getTestProfile();
    await patchProfile({ ifMatch: getProfileResult.etag });
  });

  it('should throw precondition error when using an incorrect ifMatch', async () => {
    await createObjectProfile();
    const promise = patchProfile({ ifMatch: 'incorrect_etag' });
    await assertError(IfMatch, promise);
  });

  it('should throw precondition error when using an incorrect ifNoneMatch', async () => {
    await createObjectProfile();
    const promise = patchProfile({ ifNoneMatch: '*' });
    await assertError(IfNoneMatch, promise);
  });

  it('should allow patch when not using an ifMatch or ifNoneMatch', async () => {
    await createObjectProfile();
    await patchProfile();
  });

  it('should throw max etag error when using ifMatch and ifNoneMatch', async () => {
    await createObjectProfile();
    const promise = patchProfile({ ifMatch: 'incorrect_etag', ifNoneMatch: '*' });
    await assertError(MaxEtags, promise);
  });
});
