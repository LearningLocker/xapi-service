import * as assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import { xapiHeaderVersion } from '../../../../activities/utils/constants';
import createClientModel from '../../../tests/utils/createClientModel';
import createStatement from '../../../tests/utils/createStatement';
import { jsonContentType, statementsRoute } from '../../../utils/constants';
import setup from '../../tests/utils/setup';
import repo from '../../../repo';

describe('putStatement', () => {
  const { supertest } = setup();

  it('should throw error for incorrect bypassQueues query param', async () => {
    const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035586';

    await supertest
      .put(statementsRoute)
      .set('Content-Type', jsonContentType)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .query({
        bypassQueues: 'abc',
        statementId: TEST_ID,
      })
      .send(createStatement())
      .expect((response) => {
        assert.strictEqual(response.status, StatusCodes.BAD_REQUEST);
        assert.deepStrictEqual(response.body.warnings, [
          `Problem in 'query.bypassQueues'. Received '"abc"'`,
        ]);
      });
  });

  it('should insert statement with proper bypassQueues query param', async () => {
    const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035587';
    const TEST_CLIENT = createClientModel();
    const expectedCompletedQueues = ['STATEMENT_QUEUE_1', 'STATEMENT_QUEUE_2'];

    await supertest
      .put(statementsRoute)
      .set('Content-Type', jsonContentType)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .query({
        bypassQueues: expectedCompletedQueues.join(','),
        statementId: TEST_ID,
      })
      .send(createStatement())
      .expect(async (response) => {
        assert.strictEqual(response.status, StatusCodes.NO_CONTENT);

        const fullStatement = await repo.getStatement({ id: TEST_ID, client: TEST_CLIENT });

        assert.deepStrictEqual(fullStatement.completedQueues, expectedCompletedQueues);
      });
  });
});
