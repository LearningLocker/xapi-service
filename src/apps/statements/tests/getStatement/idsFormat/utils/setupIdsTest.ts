import assert from 'assert';
import { isArray } from 'lodash';
import createClientModel from '../../../utils/createClientModel';
import setup from '../../../utils/setup';
import storeStatementsInService from '../../../utils/storeStatementsInService';

const TEST_CLIENT = createClientModel();

export default () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  return async (exactStatement: any, idStatement: any): Promise<void> => {
    const ids = await storeStatements([exactStatement]);
    const result = await service.getStatement({
      client: TEST_CLIENT,
      format: 'ids',
      id: ids[0],
      voided: false,
    });
    const actualStatements = result.statements;
    const expectedStatement = { ...actualStatements[0], ...idStatement };
    assert(isArray(actualStatements));
    assert.equal(actualStatements.length, 1);
    assert.deepEqual(actualStatements[0], expectedStatement);
  };
};
