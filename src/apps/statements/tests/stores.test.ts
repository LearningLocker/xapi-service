import assert from 'assert';
import Actor from '../models/Actor';
import createClientModel from './utils/createClientModel';
import createStatement from './utils/createStatement';
import setup from './utils/setup';
import storeStatementsInService from './utils/storeStatementsInService';

const LRS2_ID = '5988f0f00000000000000002';
const LRS2_AUTHORITY: Actor = {
  objectType: 'Agent',
  mbox: 'mailto:lrs2@test.com',
};
const LRS2_CLIENT = createClientModel({
  lrs_id: LRS2_ID,
  authority: LRS2_AUTHORITY,
});

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_STATEMENT = createStatement({ id: TEST_ID });
const TEST_CLIENT = createClientModel();

describe('insert across 2 different stores with the same id', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  it('should return the correct statements when calling getStatements', async () => {
    const LRS2_STATEMENT_INSERT = createStatement({
      id: TEST_ID,
    });
    await storeStatements([TEST_STATEMENT], [], TEST_CLIENT);
    await storeStatements([LRS2_STATEMENT_INSERT], [], LRS2_CLIENT);
    const LRS1_STATEMENT = await service.getStatements({ client: TEST_CLIENT });
    const LRS2_STATEMENT = await service.getStatements({ client: LRS2_CLIENT });

    assert.equal(LRS1_STATEMENT.statements[0].authority.mbox, TEST_CLIENT.authority.mbox);
    assert.equal(LRS2_STATEMENT.statements[0].authority.mbox, LRS2_CLIENT.authority.mbox);
  });

  it('should return the correct statement when calling getStatements', async () => {
    const LRS2_STATEMENT_INSERT = createStatement({
      id: TEST_ID,
    });
    await storeStatements([TEST_STATEMENT], [], TEST_CLIENT);
    await storeStatements([LRS2_STATEMENT_INSERT], [], LRS2_CLIENT);
    const LRS1_STATEMENT = await service.getStatement({
      id: TEST_ID,
      voided: false,
      client: TEST_CLIENT,
    });
    const LRS2_STATEMENT = await service.getStatement({
      id: TEST_ID,
      voided: false,
      client: LRS2_CLIENT,
    });

    assert.equal(LRS1_STATEMENT.statements[0].authority.mbox, TEST_CLIENT.authority.mbox);
    assert.equal(LRS2_STATEMENT.statements[0].authority.mbox, LRS2_CLIENT.authority.mbox);
  });
});
