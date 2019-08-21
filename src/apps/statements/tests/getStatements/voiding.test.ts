import createClientModel from '../utils/createClientModel';
import createStatement from '../utils/createStatement';
import createVoidingStatement from '../utils/createVoidingStatement';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';
import assertFilteredStatements from './utils/assertFilteredStatements';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_VOIDER_ID = '1c86d8e9-f325-404f-b3d9-24c451035583';
const TEST_STATEMENT = createStatement({ id: TEST_ID });
const TEST_VOIDER = createVoidingStatement(TEST_ID, TEST_VOIDER_ID);
const TEST_CLIENT = createClientModel();

describe('get statements', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const assertVoided = async () => {
    await assertFilteredStatements(service)({
      agent: TEST_STATEMENT.actor,
      client: TEST_CLIENT,
    }, [TEST_VOIDER_ID]);
  };

  it('should return only the voider when it is voiding in a following batch', async () => {
    await storeStatements([TEST_STATEMENT]);
    await storeStatements([TEST_VOIDER]);
    await assertVoided();
  });

  it('should return only the voider when it is voiding in a previous batch', async () => {
    await storeStatements([TEST_VOIDER]);
    await storeStatements([TEST_STATEMENT]);
    await assertVoided();
  });

  it('should return only the voider when it is voiding earlier in the same batch', async () => {
    await storeStatements([TEST_VOIDER, TEST_STATEMENT]);
    await assertVoided();
  });

  it('should return only the voider when it is voiding later in the same batch', async () => {
    await storeStatements([TEST_STATEMENT, TEST_VOIDER]);
    await assertVoided();
  });
});
