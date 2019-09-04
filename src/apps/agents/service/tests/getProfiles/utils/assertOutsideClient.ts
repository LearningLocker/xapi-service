import * as assert from 'assert';
import getTestProfiles from '../../../../utils/getTestProfiles';

export default async () => {
  const profilesResult = await getTestProfiles();
  assert.deepEqual(profilesResult.profileIds, []);
};
