import assert from 'assert';
import { isArray } from 'lodash';
import setupService from 'jscommons/dist/tests/utils/setupService';

import { repoFactoryConfig } from '../../repo';
import factory from '../../repo/factory';
import serviceFactory from '../../serviceFactory';
import createClientModel from '../utils/createClientModel';
import createStatement from '../utils/createStatement';
import storeStatementsInService from '../utils/storeStatementsInService';

describe(__filename, () => {
  const repo = factory(repoFactoryConfig);
  const serviceFacade = serviceFactory({
    repo,
  });
  const setup = setupService(serviceFacade);
  const service = setup();
  const storeStatements = storeStatementsInService(service);
  const TEST_CLIENT = createClientModel();
  const TEST_ID_1 = '1c86d8e9-f325-404f-b3d9-24c451035586';

  const EXPECTED_TEST_STATEMENT = {
    id: TEST_ID_1,
    completedQueues: ['STATEMENT_QUEUE_1'],
  };

  beforeEach(async () => {
    await service.clearService();
  });

  it('should store statements with specified completed queues', async () => {
    const expectedSavedCompletedQueues = ['STATEMENT_QUEUE_1'];
    const statementIds: string[] = await storeStatements(
      [createStatement({ id: TEST_ID_1 })],
      undefined,
      TEST_CLIENT,
      undefined,
      expectedSavedCompletedQueues,
    );

    assert.equal(isArray(statementIds), true);
    assert.deepEqual(statementIds, [TEST_ID_1]);

    const fullStatement = await repo.getStatement({ id: TEST_ID_1, client: TEST_CLIENT });

    assert.deepEqual(fullStatement.completedQueues, expectedSavedCompletedQueues);
  });
});
