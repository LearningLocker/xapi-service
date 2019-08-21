import assert from 'assert';
import Forbidden from 'jscommons/dist/errors/Forbidden';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { difference } from 'lodash';
import * as scopes from '../../utils/scopes';
import allScopes from '../../utils/scopes';
import createClientModel from '../utils/createClientModel';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_STATEMENT = createStatement({ id: TEST_ID });
const TEST_FORBIDDEN_SCOPES = difference(allScopes, scopes.STATEMENT_READ_SCOPES);

describe('get statements with scopes', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const testReadAllScope = async (clientScopes: string[]) => {
    const client = createClientModel({ _id: '59891b200000000000000000', scopes: clientScopes });
    await storeStatements([TEST_STATEMENT]);
    const result = await service.getStatements({ client });
    const actualIds = result.statements.map((statement) => {
      return statement.id;
    });
    const expectedIds = [TEST_ID];
    assert.deepEqual(actualIds, expectedIds);
  };

  it('should return no statements when using a different client with read mine scope', async () => {
    const client = createClientModel({
      _id: '59891b200000000000000000',
      scopes: [scopes.XAPI_STATEMENTS_READ_MINE],
    });
    await storeStatements([TEST_STATEMENT]);
    const actualStatements = (await service.getStatements({ client })).statements;
    assert.deepEqual(actualStatements, []);
  });

  it('should return a statement when using a different client with xAPI all scope', async () => {
    await testReadAllScope([scopes.XAPI_ALL]);
  });

  it('should return a statement when using a different client with xAPI read scope', async () => {
    await testReadAllScope([scopes.XAPI_READ]);
  });

  it('should return a statement when using a different client with xAPI read statements scope',
    async () => {
      await testReadAllScope([scopes.XAPI_STATEMENTS_READ]);
    },
  );

  it('should return a statement when using a different client with read all scope', async () => {
    await testReadAllScope([scopes.ALL_READ]);
  });

  it('should throw an error when using a forbidden read scope', async () => {
    const client = createClientModel({
      _id: '59891b200000000000000000',
      scopes: TEST_FORBIDDEN_SCOPES,
    });
    await storeStatements([TEST_STATEMENT]);
    const promise = service.getStatements({ client });
    await assertError(Forbidden, promise);
  });
});
