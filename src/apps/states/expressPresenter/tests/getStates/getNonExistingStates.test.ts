import { BAD_REQUEST, OK } from 'http-status-codes';
import {
  TEST_INVALID_ACTIVITY_ID,
  TEST_INVALID_AGENT,
  TEST_INVALID_REGISTRATION,
  TEST_INVALID_TIMESTAMP,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import getStates from './utils/getStates';

describe('expressPresenter.getStates with non-existing agent', () => {
  setup();

  it('should return no state ids when getting a non-existing activity id', async () => {
    await getStates().expect(OK, []);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    await getStates({
      activityId: TEST_INVALID_ACTIVITY_ID,
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when using an invalid agent', async () => {
    await getStates({
      agent: JSON.stringify(TEST_INVALID_AGENT),
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when using an invalid registration', async () => {
    await getStates({
      registration: TEST_INVALID_REGISTRATION,
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when using an invalid since', async () => {
    await getStates({
      since: TEST_INVALID_TIMESTAMP,
    }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the activity id', async () => {
    await getStates({ activityId: undefined }).expect(BAD_REQUEST);
  });

  it('should throw warnings when missing the agent', async () => {
    await getStates({ agent: undefined }).expect(BAD_REQUEST);
  });
});
