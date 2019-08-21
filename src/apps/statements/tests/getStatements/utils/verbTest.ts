import createClientModel from '../../utils/createClientModel';
import createStatement from '../../utils/createStatement';
import setup from '../../utils/setup';
import storeStatementsInService from '../../utils/storeStatementsInService';
import FilteredStatementsAsserter from './FilteredStatementsAsserter';

const TEST_TARGET_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_MISSING_ID = '1c86d8e9-f325-404f-b3d9-24c451035583';
const TEST_TARGET_VERB_ID = 'http://www.example.com/object/1';
const TEST_MISSING_VERB_ID = 'http://www.example.com/object/2';
const TEST_CLIENT = createClientModel();

export default (assertFilteredStatements: FilteredStatementsAsserter) => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const filterStatements = async (statements: any[]) => {
    await storeStatements(statements);
    await assertFilteredStatements(service)({
      verb: TEST_TARGET_VERB_ID,
      client: TEST_CLIENT,
    }, [TEST_TARGET_ID]);
  };

  it('should return statements when they match the verb', async () => {
    await filterStatements([
      createStatement({ id: TEST_TARGET_ID, verb: { id: TEST_TARGET_VERB_ID }}),
      createStatement({ id: TEST_MISSING_ID, verb: { id: TEST_MISSING_VERB_ID }}),
    ]);
  });
};
