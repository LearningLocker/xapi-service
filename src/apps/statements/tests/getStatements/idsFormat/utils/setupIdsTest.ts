import assert from 'assert';
import { isArray } from 'lodash';
import createClientModel from '../../../utils/createClientModel';
import setup from '../../../utils/setup';
import storeStatementsInService from '../../../utils/storeStatementsInService';

const TEST_CLIENT = createClientModel();

export default () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  return async (exactStatement: any, canonicalStatement: any): Promise<void> => {
    await storeStatements([exactStatement]);
    const result = await service.getStatements({
      client: TEST_CLIENT,
      format: 'ids',
    });
    const actualStatements = result.statements;
    const expectedStatement = { ...actualStatements[0], ...canonicalStatement };
    assert(isArray(actualStatements));
    assert.equal(actualStatements.length, 1);
    assert.deepEqual(actualStatements[0], expectedStatement);
  };
};
