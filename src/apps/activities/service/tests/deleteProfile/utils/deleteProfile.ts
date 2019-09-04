import DeleteProfileOptions from '../../../../serviceFactory/options/DeleteProfileOptions';
import service from '../../../../utils/testService';
import { TEST_ACTIVITY_ID, TEST_CLIENT, TEST_PROFILE_ID } from '../../../../utils/testValues';

export default async (optsOverrides: Partial<DeleteProfileOptions> = {}) => {
  await service.deleteProfile({
    activityId: TEST_ACTIVITY_ID,
    client: TEST_CLIENT,
    profileId: TEST_PROFILE_ID,
    ...optsOverrides,
  });
};
