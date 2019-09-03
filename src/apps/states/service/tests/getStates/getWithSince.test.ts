import * as assert from 'assert';
import { delay } from 'bluebird';
import createTextState from '../../../utils/createTextState';
import getTestStates from '../../../utils/getTestStates';
import { TEST_STATE_ID } from '../../../utils/testValues';
import setup from '../utils/setup';

const TEST_DELAY_MS = 2;

describe('getStates with since', () => {
  setup();

  it('should return no state ids when updated before since', async () => {
    await createTextState();
    await Promise.resolve(delay(TEST_DELAY_MS));
    const timestamp = new Date();
    const getStatesResult = await getTestStates({ since: timestamp.toISOString() });
    assert.deepEqual(getStatesResult.stateIds, []);
  });

  it('should return the state id when updated after since', async () => {
    const timestamp = new Date();
    await Promise.resolve(delay(TEST_DELAY_MS));
    await createTextState();
    const getStatesResult = await getTestStates({ since: timestamp.toISOString() });
    assert.deepEqual(getStatesResult.stateIds, [TEST_STATE_ID]);
  });
});
