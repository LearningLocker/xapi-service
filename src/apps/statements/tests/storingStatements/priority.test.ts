import assert from 'assert';
import IORedis from 'ioredis';
import { isArray } from 'lodash';
import config from '../../../../config';
import { StatementProcessingPriority } from '../../enums/statementProcessingPriority.enum';
import { EVENT_NAME } from '../../repo/eventsRepo/utils/constants';
import { getPrefixWithProcessingPriority } from '../../repo/eventsRepo/utils/getPrefixWithProcessingPriority';
import connectToRedis from '../../repo/utils/connectToRedis';
import { TEST_ORGANISATION_ID } from '../utils/createClientModel';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';

interface StatementPayload {
  readonly organisationId: string;
  readonly statementId: string;
}

const checkRedisPayloadArray = async ({
  redisClient,
  priority,
  items,
}: {
  readonly redisClient: IORedis.Redis;
  readonly priority: StatementProcessingPriority;
  readonly items: StatementPayload[];
}) => {
  const eventName = `${getPrefixWithProcessingPriority(
    config.redis.prefix,
    priority,
  )}:${EVENT_NAME}`;
  const listLength = await redisClient.llen(eventName);

  assert.equal(
    listLength,
    items.length,
    `Expected payload list length is incorrect for for "${priority}" priority`,
  );

  const listData = await redisClient.lrange(eventName, 0, listLength);
  const expectedPayloadItems = items.map((statementPayload) => {
    return JSON.stringify(statementPayload);
  });

  assert.deepEqual(
    listData,
    expectedPayloadItems,
    `Expected payload items are incorrect for "${priority}" priority`,
  );
};

describe(__filename, () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const TEST_ID_1 = '1c86d8e9-f325-404f-b3d9-24c451035583';
  const TEST_ID_2 = '1c86d8e9-f325-404f-b3d9-24c451035584';
  const TEST_ID_3 = '1c86d8e9-f325-404f-b3d9-24c451035585';

  it('should store statements with different priority', async () => {
    // This is the only adapter for the events repo at the current moment
    const redisClient = await connectToRedis()();

    const lowStatementIds: string[] = await storeStatements(
      [createStatement({ id: TEST_ID_1 }), createStatement({ id: TEST_ID_2 })],
      undefined,
      undefined,
      StatementProcessingPriority.LOW,
    );
    assert.equal(isArray(lowStatementIds), true);
    assert.deepEqual(lowStatementIds, [TEST_ID_1, TEST_ID_2]);

    const mediumStatementIds: string[] = await storeStatements(
      [createStatement({ id: TEST_ID_3 })],
      undefined,
      undefined,
      StatementProcessingPriority.MEDIUM,
    );
    assert.equal(isArray(mediumStatementIds), true);
    assert.deepEqual(mediumStatementIds, [TEST_ID_3]);

    await checkRedisPayloadArray({
      redisClient,
      priority: StatementProcessingPriority.LOW,
      items: [
        { statementId: TEST_ID_1, organisationId: TEST_ORGANISATION_ID },
        { statementId: TEST_ID_2, organisationId: TEST_ORGANISATION_ID },
      ],
    });
    await checkRedisPayloadArray({
      redisClient,
      priority: StatementProcessingPriority.MEDIUM,
      items: [{ statementId: TEST_ID_3, organisationId: TEST_ORGANISATION_ID }],
    });
  });
});
