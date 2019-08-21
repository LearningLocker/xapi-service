import createClientModel from '../../utils/createClientModel';
import createContext from '../../utils/createContext';
import createStatement from '../../utils/createStatement';
import createSubStatement from '../../utils/createSubStatement';
import createSubStatementContext from '../../utils/createSubStatementContext';
import setup from '../../utils/setup';
import storeStatementsInService from '../../utils/storeStatementsInService';
import FilteredStatementsAsserter from './FilteredStatementsAsserter';

const TEST_TARGET_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_MISSING_ID = '1c86d8e9-f325-404f-b3d9-24c451035583';
const TEST_TARGET_ACTIVITY = 'http://www.example.com/object/1';
const TEST_MISSING_ACTIVITY = 'http://www.example.com/object/2';
const TEST_CLIENT = createClientModel();

export default (assertFilteredStatements: FilteredStatementsAsserter) => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const assertFilter = async (
    createActivity: (activity: any) => any,
    relatedActivities = false,
  ) => {
    const statement1 = createStatement({
      id: TEST_TARGET_ID,
      ...createActivity({ objectType: 'Activity', id: TEST_TARGET_ACTIVITY }),
    });
    const statement2 = createStatement({
      id: TEST_MISSING_ID,
      ...createActivity({ objectType: 'Activity', id: TEST_MISSING_ACTIVITY }),
    });
    await storeStatements([statement1, statement2]);
    await assertFilteredStatements(service)({
      activity: TEST_TARGET_ACTIVITY,
      related_activities: relatedActivities,
      client: TEST_CLIENT,
    }, [TEST_TARGET_ID]);
  };

  it('should return statements when they match the activity in the object', async () => {
    await assertFilter((object: any) => {
      return { object };
    });
  });

  it('should return statements when they match the activity in the parent', async () => {
    await assertFilter((activity: any) => {
      return createContext({ parent: [activity] });
    }, true);
  });

  it('should return statements when they match the activity in the grouping', async () => {
    await assertFilter((activity: any) => {
      return createContext({ grouping: [activity] });
    }, true);
  });

  it('should return statements when they match the activity in the category', async () => {
    await assertFilter((activity: any) => {
      return createContext({ category: [activity] });
    }, true);
  });

  it('should return statements when they match the activity in the other', async () => {
    await assertFilter((activity: any) => {
      return createContext({ other: [activity] });
    }, true);
  });

  it('should return statements when they match the activity in the sub statement object',
    async () => {
      await assertFilter((object: any) => {
        return createSubStatement({ object });
      }, true);
    },
  );

  it('should return statements when they match the activity in the sub statement parent',
    async () => {
      await assertFilter((activity: any) => {
        return createSubStatementContext({ parent: [activity] });
      }, true);
    },
  );

  it('should return statements when they match the activity in the sub statement grouping',
    async () => {
      await assertFilter((activity: any) => {
        return createSubStatementContext({ grouping: [activity] });
      }, true);
    },
  );

  it('should return statements when they match the activity in the sub statement category',
    async () => {
      await assertFilter((activity: any) => {
        return createSubStatementContext({ category: [activity] });
      }, true);
    },
  );

  it('should return statements when they match the activity in the sub statement other',
    async () => {
      await assertFilter((activity: any) => {
        return createSubStatementContext({ other: [activity] });
      }, true);
    },
  );
  // tslint:disable-next-line:max-file-line-count
};
