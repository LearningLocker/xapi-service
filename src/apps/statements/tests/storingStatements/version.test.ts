import assert from 'assert';
import { xapiStatementVersion } from '../../utils/constants';
import createClientModel from '../utils/createClientModel';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_CLIENT = createClientModel();

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_STATEMENT_WITHOUT_VERSION = createStatement({ id: TEST_ID });
const TEST_STATEMENT_WITH_VERSION = createStatement({ id: TEST_ID, version: '1.0.2' });

describe('store statements ensures version handled correctly', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const getStatement = async () => {
    const result = await service.getStatement({ id: TEST_ID, voided: false, client: TEST_CLIENT });
    return result.statements[0];
  };

  it('should change version to use constant when passed in', async () => {
    await storeStatements([TEST_STATEMENT_WITH_VERSION]);
    const statement = await getStatement();
    assert.equal(statement.version, TEST_STATEMENT_WITH_VERSION.version);
  });

  it('should use version 1.0.0 when version not set', async () => {
    await storeStatements([TEST_STATEMENT_WITHOUT_VERSION]);
    const statement = await getStatement();
    assert.equal(statement.version, xapiStatementVersion);
  });
});
