import activityFormatTest from './activityFormatTest';
import actorTest from './actorTest';

export default (
  createObjectStatement: (object: any) => any,
  createIdsObjectStatement: (object: any) => any = createObjectStatement,
) => {
  describe('activity', () => {
    activityFormatTest(createObjectStatement, createIdsObjectStatement);
  });
  actorTest(createObjectStatement, createIdsObjectStatement);
};
