import StatementTypeAsserter from './StatementTypeAsserter';

const TEST_AGENT = { mbox: 'mailto:test@example.com' };

export default (assertTypedStatement: StatementTypeAsserter) => {
  it('should generate an objectType in actor', async () => {
    await assertTypedStatement(TEST_AGENT, 'Agent', (actor) => {
      return { actor };
    });
  });

  it('should generate an objectType in instructor', async () => {
    await assertTypedStatement(TEST_AGENT, 'Agent', (instructor) => {
      return { context: { instructor } };
    });
  });

  it('should generate an objectType in team', async () => {
    await assertTypedStatement(TEST_AGENT, 'Group', (team) => {
      return { context: { team } };
    });
  });
};
