import { delay } from 'bluebird';
import { OK } from 'http-status-codes';
import createTextState from '../../../utils/createTextState';
import { TEST_STATE_ID } from '../../../utils/testValues';
import setup from '../utils/setup';
import getStates from './utils/getStates';

const TEST_DELAY_MS = 2;

describe('expressPresenter.getStates with since', () => {
  setup();

  it('should return no state ids when updated before since', async () => {
    await createTextState();
    await Promise.resolve(delay(TEST_DELAY_MS));
    const timestamp = new Date();
    await getStates({ since: timestamp.toISOString() }).expect(OK, []);
  });

  it('should return the state id when updated after since', async () => {
    const timestamp = new Date();
    await Promise.resolve(delay(TEST_DELAY_MS));
    await createTextState();
    await getStates({ since: timestamp.toISOString() }).expect(OK, [TEST_STATE_ID]);
  });
});
