import assertError from 'jscommons/dist/tests/utils/assertError';
import IfMatch from '../../../errors/IfMatch';
import createTextProfile from '../../../utils/createTextProfile';
import getTestProfile from '../../../utils/getTestProfile';
import setup from '../utils/setup';
import deleteProfile from './utils/deleteProfile';

describe('deleteProfile with etags', () => {
  setup();

  it('should allow deletion when using a correct etag', async () => {
    await createTextProfile();
    const getProfileResult = await getTestProfile();
    await deleteProfile({ ifMatch: getProfileResult.etag });
  });

  it('should throw precondition error when using an incorrect ifMatch', async () => {
    await createTextProfile();
    const promise = deleteProfile({ ifMatch: 'incorrect_etag' });
    await assertError(IfMatch, promise);
  });

  it('should allow deletion when not using an IfMatch', async () => {
    await createTextProfile();
    await deleteProfile();
  });
});
