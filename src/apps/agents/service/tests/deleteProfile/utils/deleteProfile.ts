import DeleteProfileOptions from '../../../../serviceFactory/options/DeleteProfileOptions';
import service from '../../../../utils/testService';
import { TEST_CLIENT, TEST_MBOX_AGENT, TEST_PROFILE_ID } from '../../../../utils/testValues';

export default async (optsOverrides: Partial<DeleteProfileOptions> = {}) => {
  await service.deleteProfile({
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    profileId: TEST_PROFILE_ID,
    ...optsOverrides,
  });
};
