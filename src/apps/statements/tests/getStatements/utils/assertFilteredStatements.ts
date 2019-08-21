import assert from 'assert';
import { isArray } from 'lodash';
import FilteredStatementsAsserter from './FilteredStatementsAsserter';

const assertFilteredStatements: FilteredStatementsAsserter = (service) => {
  return async (opts, expectedIds) => {
    const result = await service.getStatements(opts);
    const statements = result.statements;
    assert(isArray(statements), 'Expected an array of statements');
    const actualIds = statements.map((statement) => {
      return statement.id;
    });
    assert.deepEqual(actualIds, expectedIds);
  };
};

export default assertFilteredStatements;
