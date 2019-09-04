import assertError from 'jscommons/dist/tests/utils/assertError';
import Conflict from '../../../errors/Conflict';
import IfMatch from '../../../errors/IfMatch';
import IfNoneMatch from '../../../errors/IfNoneMatch';
import MaxEtags from '../../../errors/MaxEtags';
import MissingEtags from '../../../errors/MissingEtags';
import createTextProfile from '../../../utils/createTextProfile';
import getTestProfile from '../../../utils/getTestProfile';
import setup from '../utils/setup';
import overwriteProfile from './utils/overwriteProfile';

describe('overwriteProfile with etags', () => {
  setup();

  it('should allow overwrites when using a correct etag', async () => {
    await createTextProfile();
    const getProfileResult = await getTestProfile();
    await overwriteProfile({ ifMatch: getProfileResult.etag, ifNoneMatch: undefined });
  });

  it('should throw precondition error when using an incorrect ifMatch', async () => {
    await createTextProfile();
    const promise = overwriteProfile({ ifMatch: 'incorrect_etag', ifNoneMatch: undefined });
    await assertError(IfMatch, promise);
  });

  it('should throw precondition error when using an incorrect ifNoneMatch', async () => {
    await createTextProfile();
    const promise = overwriteProfile({ ifNoneMatch: '*' });
    await assertError(IfNoneMatch, promise);
  });

  it('should throw conflict error when not using ifMatch or ifNoneMatch', async () => {
    await createTextProfile();
    const promise = overwriteProfile({ ifNoneMatch: undefined});
    await assertError(Conflict, promise);
  });

  it('should throw max etag error when using ifMatch and ifNoneMatch', async () => {
    await createTextProfile();
    const promise = overwriteProfile({ ifMatch: 'incorrect_etag', ifNoneMatch: '*' });
    await assertError(MaxEtags, promise);
  });

  it('should throw missing etags error when not using ifMatch and ifNoneMatch', async () => {
    const promise = overwriteProfile({ ifNoneMatch: undefined });
    await assertError(MissingEtags, promise);
  });
});
