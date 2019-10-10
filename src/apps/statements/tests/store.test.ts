import assert from 'assert';
import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import Statement from '../models/Statement';
import createClientModel from './utils/createClientModel';
import createStatement from './utils/createStatement';
import setup from './utils/setup';
import storeStatementsInService from './utils/storeStatementsInService';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_STATEMENT = createStatement({ id: TEST_ID });
const TEST_UNKNOWN_CLIENT = createClientModel({
  lrs_id: '5988ff000000000000000001',
});
const TEST_OPTIONS = {
  client: TEST_UNKNOWN_CLIENT,
};

describe('get statement', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const assertNoStatements = (actualStatements: Statement[]) => {
    assert.deepEqual(actualStatements, []);
  };

  it('should return no statements when getting statements with unknown store', async () => {
    await storeStatements([TEST_STATEMENT]);
    const actualStatements = (await service.getStatements(TEST_OPTIONS)).statements;
    assertNoStatements(actualStatements as Statement[]);
  });

  it('should ensure that we do not make unnecessary database queries for refs', async () => {
    await storeStatements([{
      actor: { mbox: 'mailto:test@example.org' },
      verb: { id: 'https://example.org/verb' },
      object: { id: 'https://example.org/activity' },
    }]);
  });

  it('should throw an error when the store does not match', async () => {
    const unknownClient = createClientModel({
      lrs_id: '5988ff000000000000000001',
    });
    await storeStatements([TEST_STATEMENT]);
    const promise = service.getStatement({ id: TEST_ID, voided: false, client: unknownClient });
    await assertError(NoModel, promise);
  });
});
