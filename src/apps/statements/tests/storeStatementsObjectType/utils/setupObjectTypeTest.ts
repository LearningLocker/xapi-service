import assert from 'assert';
import { merge } from 'lodash';
import createClientModel from '../../utils/createClientModel';
import createStatement from '../../utils/createStatement';
import setup from '../../utils/setup';
import storeStatementsInService from '../../utils/storeStatementsInService';
import StatementTypeAsserter from './StatementTypeAsserter';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_CLIENT = createClientModel();

export default () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const getStatement = async () => {
    const result = await service.getStatement({ id: TEST_ID, voided: false, client: TEST_CLIENT });
    return result.statements[0];
  };

  const storeStatement = async (statement: any) => {
    await storeStatements([
      createStatement({
        id: TEST_ID,
        ...statement,
      }),
    ]);
    return getStatement();
  };

  const assertTypedStatement: StatementTypeAsserter = async (obj, objectType, objCreator) => {
    const actualStatement = await storeStatement(objCreator(obj));
    const typedStatement = createStatement({
      id: TEST_ID,
      ...objCreator({
        ...obj,
        objectType,
      }),
    });
    const expectedStatement = merge({}, actualStatement, typedStatement);
    assert.deepEqual(actualStatement, expectedStatement);
  };

  return assertTypedStatement;
};
