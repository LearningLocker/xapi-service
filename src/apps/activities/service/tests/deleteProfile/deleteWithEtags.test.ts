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
    console.debug('401'); // tslint:disable-line: no-console - 2021-02-25 flaky CI
    await createTextProfile();
    console.debug('402'); // tslint:disable-line: no-console - 2021-02-25 flaky CI
    const promise = deleteProfile({ ifMatch: 'incorrect_etag' });
    console.debug('403'); // tslint:disable-line: no-console - 2021-02-25 flaky CI
    await assertError(IfMatch, promise);
    console.debug('404'); // tslint:disable-line: no-console - 2021-02-25 flaky CI
  });

  it('should allow deletion when not using an IfMatch', async () => {
    await createTextProfile();
    await deleteProfile();
  });
});
