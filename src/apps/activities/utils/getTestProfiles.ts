import GetProfilesOptions from '../serviceFactory/options/GetProfilesOptions';
import GetProfilesResult from '../serviceFactory/results/GetProfilesResult';
import service from './testService';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
} from './testValues';

export default (optsOverrides: Partial<GetProfilesOptions> = {}): Promise<GetProfilesResult> => {
  return service.getProfiles({
    activityId: TEST_ACTIVITY_ID,
    client: TEST_CLIENT,
    ...optsOverrides,
  });
};
