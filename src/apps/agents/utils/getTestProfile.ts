import GetProfileOptions from '../serviceFactory/options/GetProfileOptions';
import GetProfileResult from '../serviceFactory/results/GetProfileResult';
import service from './testService';
import {
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_PROFILE_ID,
} from './testValues';

export default (optsOverrides: Partial<GetProfileOptions> = {}): Promise<GetProfileResult> => {
  return service.getProfile({
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    profileId: TEST_PROFILE_ID,
    ...optsOverrides,
  });
};
