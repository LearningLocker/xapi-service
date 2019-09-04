import DeleteStatesOptions from '../../../../serviceFactory/options/DeleteStatesOptions';
import service from '../../../../utils/testService';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
} from '../../../../utils/testValues';

export default async (optsOverrides: Partial<DeleteStatesOptions> = {}) => {
  await service.deleteStates({
    activityId: TEST_ACTIVITY_ID,
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    registration: TEST_REGISTRATION,
    ...optsOverrides,
  });
};
