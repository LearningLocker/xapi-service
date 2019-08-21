import createGroup from './createGroup';
import StatementTypeAsserter from './StatementTypeAsserter';

const TEST_AGENT = { mbox: 'mailto:test@example.com' };

export default (assertTypedStatement: StatementTypeAsserter) => {
  const assertTypedMember = (objCreator: (data: any) => any) => {
    return assertTypedStatement(TEST_AGENT, 'Agent', (member) => {
      return objCreator(createGroup(member));
    });
  };

  it('should generate an objectType in actor member', async () => {
    await assertTypedMember((actor) => {
      return { actor };
    });
  });

  it('should generate an objectType in object member', async () => {
    await assertTypedMember((object) => {
      return { object };
    });
  });

  it('should generate an objectType in team member', async () => {
    await assertTypedMember((team) => {
      return { context: { team } };
    });
  });
};
