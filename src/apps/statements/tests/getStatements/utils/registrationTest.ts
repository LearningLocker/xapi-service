import createClientModel from '../../utils/createClientModel';
import createStatement from '../../utils/createStatement';
import setup from '../../utils/setup';
import storeStatementsInService from '../../utils/storeStatementsInService';
import FilteredStatementsAsserter from './FilteredStatementsAsserter';

const TEST_TARGET_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_MISSING_ID = '1c86d8e9-f325-404f-b3d9-24c451035583';
const TEST_TARGET_REG_ID = '1c86d8e9-f325-404f-b3d9-24c451035584';
const TEST_MISSING_REG_ID = '1c86d8e9-f325-404f-b3d9-24c451035585';
const TEST_CLIENT = createClientModel();

export default (assertFilteredStatements: FilteredStatementsAsserter) => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const filterStatements = async (statements: any[]) => {
    await storeStatements(statements);
    await assertFilteredStatements(service)({
      registration: TEST_TARGET_REG_ID,
      client: TEST_CLIENT,
    }, [TEST_TARGET_ID]);
  };

  it('should return statements when they match the registration', async () => {
    await filterStatements([
      createStatement({ id: TEST_TARGET_ID, context: { registration: TEST_TARGET_REG_ID }}),
      createStatement({ id: TEST_MISSING_ID, context: { registration: TEST_MISSING_REG_ID }}),
    ]);
  });
};
