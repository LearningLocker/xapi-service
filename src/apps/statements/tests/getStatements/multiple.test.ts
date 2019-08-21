import createClientModel from '../utils/createClientModel';
import createStatement from '../utils/createStatement';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';
import assertFilteredStatements from './utils/assertFilteredStatements';

const TEST_TARGET_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_MISSING_ID1 = '1c86d8e9-f325-404f-b3d9-24c451035583';
const TEST_MISSING_ID2 = '1c86d8e9-f325-404f-b3d9-24c451035584';
const TEST_MISSING_ID3 = '1c86d8e9-f325-404f-b3d9-24c451035585';
const TEST_TARGET_ACTOR = {objectType: 'Agent', mbox: 'mailto:target@example.com'};
const TEST_MISSING_ACTOR = {objectType: 'Agent', mbox: 'mailto:missing@example.com'};
const TEST_TARGET_VERB_ID = 'http://www.example.com/object/1';
const TEST_MISSING_VERB_ID = 'http://www.example.com/object/2';
const TEST_TARGET_ACTIVITY = 'http://www.example.com/object/1';
const TEST_MISSING_ACTIVITY = 'http://www.example.com/object/2';
const TEST_CLIENT = createClientModel();

describe('get statements on multiple filters', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const filterStatements = async (statements: any[]) => {
    await storeStatements(statements);
    await assertFilteredStatements(service)({
      agent: TEST_TARGET_ACTOR,
      activity: TEST_TARGET_ACTIVITY,
      verb: TEST_TARGET_VERB_ID,
      client: TEST_CLIENT,
    }, [TEST_TARGET_ID]);
  };

  it('should return statements when they match the verb, activity and agent', async () => {
    await filterStatements([
      createStatement({
        id: TEST_MISSING_ID1,
        actor: TEST_MISSING_ACTOR,
        verb: { id: TEST_TARGET_VERB_ID },
        object: {id: TEST_TARGET_ACTIVITY},
      }),
      createStatement({
        id: TEST_MISSING_ID2,
        actor: TEST_TARGET_ACTOR,
        verb: { id: TEST_MISSING_VERB_ID },
        object: {id: TEST_TARGET_ACTIVITY},
      }),
      createStatement({
        id: TEST_TARGET_ID,
        actor: TEST_TARGET_ACTOR,
        verb: { id: TEST_TARGET_VERB_ID },
        object: {id: TEST_TARGET_ACTIVITY},
      }),
      createStatement({
        id: TEST_MISSING_ID3,
        actor: TEST_TARGET_ACTOR,
        verb: { id: TEST_TARGET_VERB_ID },
        object: {id: TEST_MISSING_ACTIVITY},
      }),
    ]);
  });
});
