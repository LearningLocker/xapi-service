import createStatement from '../../../utils/createStatement';
import setup from '../../../utils/setup';
import assertCanonicalStatement from './assertCanonicalStatement';
import canonicalActivityTest from './canonicalActivityTest';
import createActivity from './createActivity';

const TEST_LANG = 'en-GB';
const TEST_REF_ID = '1c86d8e9-f325-404f-b3d9-24c451035583';

export default (createObjectStatement: (object: any) => any) => {
  describe('Activity object type', () => {
    canonicalActivityTest((definition) => {
      return createObjectStatement(createActivity(definition));
    });
  });

  describe('Agent object type', () => {
    setup();

    it('should not change the format when using an Agent', async () => {
      const statement = createStatement(createObjectStatement({
        objectType: 'Agent',
        mbox: 'mailto:test@example.com',
      }));
      await assertCanonicalStatement(statement, statement, [TEST_LANG]);
    });

    it('should not change the format when using an Group', async () => {
      const statement = createStatement(createObjectStatement({
        objectType: 'Group',
        mbox: 'mailto:test@example.com',
      }));
      await assertCanonicalStatement(statement, statement, [TEST_LANG]);
    });

    it('should not change the format when using a StatementRef', async () => {
      const statement = createStatement(createObjectStatement({
        objectType: 'StatementRef',
        id: TEST_REF_ID,
      }));
      await assertCanonicalStatement(statement, statement, [TEST_LANG]);
    });
  });
};
