import DeleteStateOptions from '../../../../serviceFactory/options/DeleteStateOptions';
import service from '../../../../utils/testService';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../../utils/testValues';

export default async (optsOverrides: Partial<DeleteStateOptions> = {}) => {
  await service.deleteState({
    activityId: TEST_ACTIVITY_ID,
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    registration: TEST_REGISTRATION,
    stateId: TEST_STATE_ID,
    ...optsOverrides,
  });
};
