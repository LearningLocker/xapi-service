import storeStatementsInService from '../../utils/storeStatementsInService';
import assertFilteredStatements from './assertFilteredStatements';
import createReferenceStatement from './createReferenceStatement';
import FilteredStatementsAsserter from './FilteredStatementsAsserter';

const TEST_REF_ID = '1c86d8e9-f325-404f-b3d9-24c451035594';

const assertFilteredStatementRefs: FilteredStatementsAsserter = (service) => {
  return async (opts, expectedTargetIds) => {
    const refStatement = createReferenceStatement(TEST_REF_ID, expectedTargetIds[0]);
    await storeStatementsInService(service)([refStatement]);
    await assertFilteredStatements(service)(opts, [
      TEST_REF_ID,
      ...expectedTargetIds,
    ]);
  };
};

export default assertFilteredStatementRefs;
