import assert from 'assert';
import { isArray, merge } from 'lodash';
import service from '../../../../tester';
import createClientModel from '../../../utils/createClientModel';
import storeStatementsInService from '../../../utils/storeStatementsInService';

const TEST_CLIENT = createClientModel();
const storeStatements = storeStatementsInService(service);

export default async (
  exactStatement: any,
  canonicalStatement: any,
  langs: string[],
): Promise<void> => {
  await storeStatements([exactStatement]);
  const result = await service.getStatements({
    langs,
    format: 'canonical',
    client: TEST_CLIENT,
  });
  const canonicalStatements = result.statements;
  const expectedStatement = merge({}, canonicalStatements[0], canonicalStatement);
  assert(isArray(canonicalStatements));
  assert.equal(canonicalStatements.length, 1);
  assert.deepEqual(canonicalStatements[0], expectedStatement);
};
