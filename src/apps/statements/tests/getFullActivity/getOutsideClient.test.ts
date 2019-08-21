import assert from 'assert';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import {
  TEST_ACTIVITY,
  TEST_ACTIVITY_ID,
  TEST_BASE_ACTIVITY,
  TEST_CLIENT,
  TEST_OUTSIDE_ORG_CLIENT,
  TEST_OUTSIDE_STORE_CLIENT,
} from './utils/testValues';

describe('getFullActivity outside client', () => {
  const service = setup();

  it('should return the activity ID when getting a activity outside the org', async () => {
    const statement = createStatement({ object: TEST_ACTIVITY });
    await service.storeStatements({
      models: [statement],
      attachments: [],
      client: TEST_CLIENT,
    });
    const fullActivity = await service.getFullActivity({
      activityId: TEST_ACTIVITY_ID,
      client: TEST_OUTSIDE_ORG_CLIENT,
    });
    assert.deepEqual(fullActivity, TEST_BASE_ACTIVITY);
  });

  it('should return the activity ID when getting a activity outside the store', async () => {
    const statement = createStatement({ object: TEST_ACTIVITY });
    await service.storeStatements({
      models: [statement],
      attachments: [],
      client: TEST_CLIENT,
    });
    const fullActivity = await service.getFullActivity({
      activityId: TEST_ACTIVITY_ID,
      client: TEST_OUTSIDE_STORE_CLIENT,
    });
    assert.deepEqual(fullActivity, TEST_BASE_ACTIVITY);
  });
});
