import GetProfilesOptions from '../serviceFactory/options/GetProfilesOptions';
import GetProfilesResult from '../serviceFactory/results/GetProfilesResult';
import service from './testService';
import {
  TEST_CLIENT,
  TEST_MBOX_AGENT,
} from './testValues';

export default (optsOverrides: Partial<GetProfilesOptions> = {}): Promise<GetProfilesResult> => {
  return service.getProfiles({
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    ...optsOverrides,
  });
};
