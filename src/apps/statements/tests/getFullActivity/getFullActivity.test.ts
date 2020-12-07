import assert from 'assert';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import {
  ANOTHER_TEST_CONTEXT_ACTIVITIES,
  TEST_ACTIVITY,
  TEST_ACTIVITY_ID,
  TEST_ACTIVITY_WITH_CONTEXT_ACTIVITIES,
  TEST_ACTIVITY_WITH_MERGED_CONTEXT_ACTIVITIES,
  TEST_BASE_ACTIVITY,
  TEST_CLIENT,
  TEST_CONTEXT_ACTIVITIES,
  TEST_IMMUTABLE_ACTIVITY,
  TEST_MERGE_ACTIVITY,
  TEST_MERGED_ACTIVITY,
} from './utils/testValues';

describe('getFullActivity', () => {
  const service = setup();

  it('should return the activity ID when getting a non-existing activity', async () => {
    const fullActivity = await service.getFullActivity({
      activityId: TEST_ACTIVITY_ID,
      client: TEST_CLIENT,
    });
    assert.deepEqual(fullActivity, TEST_BASE_ACTIVITY);
  });

  it('should also return the definition when getting a existing activity', async () => {
    const statement = createStatement({ object: TEST_ACTIVITY });
    await service.storeStatements({
      models: [statement],
      attachments: [],
      client: TEST_CLIENT,
    });
    const fullActivity = await service.getFullActivity({
      activityId: TEST_ACTIVITY_ID,
      client: TEST_CLIENT,
    });
    assert.deepEqual(fullActivity, TEST_ACTIVITY);
  });

  it('should merge the definitions when storing two definitions in one batch', async () => {
    const initialStatement = createStatement({ object: TEST_ACTIVITY });
    const mergeStatement = createStatement({ object: TEST_MERGE_ACTIVITY });
    await service.storeStatements({
      models: [initialStatement, mergeStatement],
      attachments: [],
      client: TEST_CLIENT,
    });
    const fullActivity = await service.getFullActivity({
      activityId: TEST_ACTIVITY_ID,
      client: TEST_CLIENT,
    });
    assert.deepEqual(fullActivity, TEST_MERGED_ACTIVITY);
  });

  it('should merge the definitions when storing two definitions in two batches', async () => {
    const initialStatement = createStatement({ object: TEST_ACTIVITY });
    const mergeStatement = createStatement({ object: TEST_MERGE_ACTIVITY });
    await service.storeStatements({
      models: [initialStatement],
      attachments: [],
      client: TEST_CLIENT,
    });
    await service.storeStatements({
      models: [mergeStatement],
      attachments: [],
      client: TEST_CLIENT,
    });
    const fullActivity = await service.getFullActivity({
      activityId: TEST_ACTIVITY_ID,
      client: TEST_CLIENT,
    });
    assert.deepEqual(fullActivity, TEST_MERGED_ACTIVITY);
  });

  it('should merge with existing activities when storing a different ID', async () => {
    const existingActivityStatement = createStatement({ object: TEST_IMMUTABLE_ACTIVITY });
    const initialStatement = createStatement({ object: TEST_ACTIVITY });
    const mergeStatement = createStatement({ object: TEST_MERGE_ACTIVITY });
    await service.storeStatements({
      models: [initialStatement, existingActivityStatement],
      attachments: [],
      client: TEST_CLIENT,
    });
    await service.storeStatements({
      models: [mergeStatement],
      attachments: [],
      client: TEST_CLIENT,
    });
    const fullActivity = await service.getFullActivity({
      activityId: TEST_ACTIVITY_ID,
      client: TEST_CLIENT,
    });
    assert.deepEqual(fullActivity, TEST_MERGED_ACTIVITY);
  });

  it(
    'should return the definition and contextActivities when getting a existing activity',
    async () => {
      const statement = createStatement({
        object: TEST_ACTIVITY,
        ...TEST_CONTEXT_ACTIVITIES,
      });
      await service.storeStatements({
        models: [statement],
        attachments: [],
        client: TEST_CLIENT,
      });
      const fullActivity = await service.getFullActivity({
        activityId: TEST_ACTIVITY_ID,
        client: TEST_CLIENT,
      });
      assert.deepEqual(fullActivity, TEST_ACTIVITY_WITH_CONTEXT_ACTIVITIES);
    },
  );

  it('should return the contextActivities when getting a existing activity',
    async () => {
      const statement = createStatement({
        object: TEST_ACTIVITY,
        ...TEST_CONTEXT_ACTIVITIES,
      });
      await service.storeStatements({
        models: [statement],
        attachments: [],
        client: TEST_CLIENT,
      });
      const fullActivity = await service.getFullActivity({
        activityId: TEST_ACTIVITY_ID,
        client: TEST_CLIENT,
      });
      assert.deepEqual(fullActivity, TEST_ACTIVITY_WITH_CONTEXT_ACTIVITIES);
    });

  it(
    'should merge the contextActivities when storing two contextActivities in one batch',
    async () => {
      const initialStatement = createStatement({
        object: TEST_ACTIVITY,
        ...TEST_CONTEXT_ACTIVITIES,
      });
      const mergeStatement = createStatement({
        object: TEST_ACTIVITY,
        ...TEST_CONTEXT_ACTIVITIES,
      });
      await service.storeStatements({
        models: [initialStatement, mergeStatement],
        attachments: [],
        client: TEST_CLIENT,
      });
      const fullActivity = await service.getFullActivity({
        activityId: TEST_ACTIVITY_ID,
        client: TEST_CLIENT,
      });
      assert.deepEqual(fullActivity, TEST_ACTIVITY_WITH_CONTEXT_ACTIVITIES);
    },
  );

  it(
    'should merge two different contextActivities when storing contextActivities in one batch',
    async () => {
      const initialStatement = createStatement({
        object: TEST_ACTIVITY,
        ...TEST_CONTEXT_ACTIVITIES,
      });
      const mergeStatement = createStatement({
        object: TEST_ACTIVITY,
        ...ANOTHER_TEST_CONTEXT_ACTIVITIES,
      });
      await service.storeStatements({
        models: [initialStatement, mergeStatement],
        attachments: [],
        client: TEST_CLIENT,
      });
      const fullActivity = await service.getFullActivity({
        activityId: TEST_ACTIVITY_ID,
        client: TEST_CLIENT,
      });
      assert.deepEqual(fullActivity, TEST_ACTIVITY_WITH_MERGED_CONTEXT_ACTIVITIES);
    },
  );

  it(
    'should return last contextActivities when storing contextActivities in two batches',
    async () => {
      const initialStatement = createStatement({
        object: TEST_ACTIVITY,
        ...TEST_CONTEXT_ACTIVITIES,
      });
      const mergeStatement = createStatement({
        object: TEST_ACTIVITY,
        ...ANOTHER_TEST_CONTEXT_ACTIVITIES,
      });
      await service.storeStatements({
        models: [initialStatement],
        attachments: [],
        client: TEST_CLIENT,
      });
      await service.storeStatements({
        models: [mergeStatement],
        attachments: [],
        client: TEST_CLIENT,
      });
      const fullActivity = await service.getFullActivity({
        activityId: TEST_ACTIVITY_ID,
        client: TEST_CLIENT,
      });
      assert.deepEqual(fullActivity, TEST_ACTIVITY_WITH_MERGED_CONTEXT_ACTIVITIES);
    },
  );
// tslint:disable-next-line:max-file-line-count
});
