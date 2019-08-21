import assert from 'assert';
import Actor from '../../models/Actor';
import createClientModel from '../utils/createClientModel';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import storeAwaitedStatements from '../utils/storeAwaitedStatements';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_AUTHORITY: Actor = {
  objectType: 'Agent',
  mbox: 'mailto:test@example.com',
};
const TEST_CLIENT = createClientModel();

describe('store statement authority', () => {
  const service = setup();
  const storeStatements = (statements: any[], authority: Actor): Promise<string[]> => {
    return storeAwaitedStatements(service)({
      models: statements,
      attachments: [],
      client: createClientModel({ authority }),
    });
  };

  const getStatement = async () => {
    const result = await service.getStatement({ id: TEST_ID, voided: false, client: TEST_CLIENT });
    return result.statements[0];
  };

  it('should use the authority option when authority is set', async () => {
    await storeStatements(
      [
        createStatement({
          id: TEST_ID,
          authority: {
            objectType: 'Agent',
            mbox: 'mailto:authority@example.com',
          },
        }),
      ],
      TEST_AUTHORITY,
    );
    const statement = await getStatement();
    assert.equal(statement.authority.mbox, TEST_AUTHORITY.mbox);
  });

  it('should use the authority option when authority is not set', async () => {
    await storeStatements(
      [
        createStatement({
          id: TEST_ID,
        }),
      ],
      TEST_AUTHORITY,
    );
    const statement = await getStatement();
    assert.equal(statement.authority.mbox, TEST_AUTHORITY.mbox);
  });
});
