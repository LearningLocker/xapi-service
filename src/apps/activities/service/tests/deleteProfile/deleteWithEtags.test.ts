import assertError from 'jscommons/dist/tests/utils/assertError';
import IfMatch from '../../../errors/IfMatch';
import createTextProfile from '../../../utils/createTextProfile';
import getTestProfile from '../../../utils/getTestProfile';
import setup from '../utils/setup';
import deleteProfile from './utils/deleteProfile';

describe('deleteProfile with etags', () => {
  setup();

  it('should allow deletion when using a correct etag', async () => {
    console.debug('601'); // tslint:disable-line: no-console - 2021-02-25 flaky CI
    await createTextProfile();
    console.debug('602'); // tslint:disable-line: no-console - 2021-02-25 flaky CI
    const getProfileResult = await getTestProfile();
    console.debug('603'); // tslint:disable-line: no-console - 2021-02-25 flaky CI
    await deleteProfile({ ifMatch: getProfileResult.etag });
    console.debug('604'); // tslint:disable-line: no-console - 2021-02-25 flaky CI
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
