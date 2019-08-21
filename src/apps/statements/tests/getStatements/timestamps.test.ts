import GetStatementsOptions from '../../serviceFactory/options/GetStatementsOptions';
import createClientModel from '../utils/createClientModel';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';
import assertFilteredStatements from './utils/assertFilteredStatements';
import delay from './utils/delay';

const TEST_ID_1 = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_ID_2 = '1c86d8e9-f325-404f-b3d9-24c451035583';
const TEST_CLIENT = createClientModel();

type TimestampFilter = (timestamp: string) => GetStatementsOptions;

describe('get statements by timestamps', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const storeStatement = (id: string): Promise<string[]> => {
    return storeStatements([
      createStatement({
        id,
        timestamp: '2017-04-18T00:00Z',
      }),
    ]);
  };

  const filterStatements = async (filter: TimestampFilter, targetId: string) => {
    await storeStatement(TEST_ID_1);
    await delay(1);
    await storeStatement(TEST_ID_2);
    const result = await service.getStatement({
      id: TEST_ID_1,
      voided: false,
      client: TEST_CLIENT,
    });
    const statement = result.statements[0];
    await assertFilteredStatements(service)(filter(statement.stored), [targetId]);
  };

  it('should return statements when they match the since', async () => {
    await filterStatements((since: string) => {
      return {
        since,
        client: TEST_CLIENT,
      };
    }, TEST_ID_2);
  });

  it('should return statements when they match the until', async () => {
    await filterStatements((until: string) => {
      return {
        until,
        client: TEST_CLIENT,
      };
    }, TEST_ID_1);
  });
});
