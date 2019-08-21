import createIdsStatement from '../../../utils/createIdsStatement';
import createStatement from '../../../utils/createStatement';
import activityFormatTest from './activityFormatTest';
import actorTest from './actorTest';
import setupIdsTest from './setupIdsTest';

const TEST_REF_ID = '1c86d8e9-f325-404f-b3d9-24c451035583';

export default (
  createObjectStatement: (object: any) => any,
  createIdsObjectStatement: (object: any) => any = createObjectStatement,
) => {
  describe('activity', () => {
    activityFormatTest(createObjectStatement, createIdsObjectStatement);
  });
  actorTest(createObjectStatement, createIdsObjectStatement);
  describe('statement ref', () => {
    const assertIdsStatements = setupIdsTest();

    it('should not change the format when using a StatementRef', async () => {
      const exactStatement = createStatement(createObjectStatement({
        objectType: 'StatementRef',
        id: TEST_REF_ID,
      }));
      const idsStatement = createIdsStatement(createIdsObjectStatement({
        objectType: 'StatementRef',
        id: TEST_REF_ID,
      }));
      await assertIdsStatements(exactStatement, idsStatement);
    });
  });
};
