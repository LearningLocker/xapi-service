import assertError from 'jscommons/dist/tests/utils/assertError';
import VoidingError from '../../errors/VoidingError';
import createVoidingStatement from '../utils/createVoidingStatement';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_ID_2 = '1c86d8e9-f325-404f-b3d9-24c451035583';
const TEST_VOIDER_1 = createVoidingStatement(TEST_ID, TEST_ID_2);
const TEST_VOIDER_2 = createVoidingStatement(TEST_ID_2);

describe('store statements voiding validation', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const assertVoidingError = (statements: any[]): Promise<void> => {
    const promise = storeStatements(statements);
    return assertError(VoidingError, promise);
  };

  it('should throw an error when voiding a voider in a following batch', async () => {
    await storeStatements([TEST_VOIDER_1]);
    await assertVoidingError([TEST_VOIDER_2]);
  });

  it('should throw an error when voiding a voider in a previous batch', async () => {
    await storeStatements([TEST_VOIDER_2]);
    await assertVoidingError([TEST_VOIDER_1]);
  });

  it('should throw an error when voiding a earlier voider in the same batch', async () => {
    await assertVoidingError([TEST_VOIDER_1, TEST_VOIDER_2]);
  });

  it('should throw an error when voiding a later voider in the same batch', async () => {
    await assertVoidingError([TEST_VOIDER_2, TEST_VOIDER_1]);
  });

  it('should throw an error when voider is voiding itself', async () => {
    await assertVoidingError([createVoidingStatement(TEST_ID, TEST_ID)]);
  });
});
