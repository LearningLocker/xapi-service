import GetStateOptions from '../serviceFactory/options/GetStateOptions';
import GetStateResult from '../serviceFactory/results/GetStateResult';
import service from './testService';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from './testValues';

export default (optsOverrides: Partial<GetStateOptions> = {}): Promise<GetStateResult> => {
  return service.getState({
    activityId: TEST_ACTIVITY_ID,
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    registration: TEST_REGISTRATION,
    stateId: TEST_STATE_ID,
    ...optsOverrides,
  });
};
