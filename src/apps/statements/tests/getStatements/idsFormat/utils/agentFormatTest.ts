import createIdsStatement from '../../../utils/createIdsStatement';
import createStatement from '../../../utils/createStatement';
import setupIdsTest from './setupIdsTest';

type ActorCreator = (ifi: any) => any;

const defaultExactActorCreator = (createIdsActor: ActorCreator): ActorCreator => {
  return (ifi: any): any => {
    return {
      objectType: 'Agent',
      name: 'Test1',
      ...createIdsActor(ifi),
    };
  };
};

export default (
  createIdsActor: ActorCreator,
  createExactActor = defaultExactActorCreator(createIdsActor),
) => {
  return (
    createActorStatement: (actor: any) => any,
    createIdsActorStatement: (actor: any) => any = createActorStatement,
  ) => {
    const assertIdsStatements = setupIdsTest();

    const assertIdsActor = async (ifi: any) => {
      const exactStatement = createStatement(createActorStatement(createExactActor(ifi)));
      const expectedStatement = createIdsStatement(createIdsActorStatement(createIdsActor(ifi)));
      await assertIdsStatements(exactStatement, expectedStatement);
    };

    it('should return the account and objectType without the name', async () => {
      const account = { name: 'testname', homePage: 'http://www.example.com' };
      await assertIdsActor({ account });
    });

    it('should return the mbox and objectType without the name', async () => {
      const mbox = 'mailto:test@example.com';
      await assertIdsActor({ mbox });
    });

    it('should return the mbox_sha1sum and objectType without the name', async () => {
      const mboxSha1sum = 'e1f9bc64eefbdf3660690684c6184f594f9a5c17';
      await assertIdsActor({ mbox_sha1sum: mboxSha1sum });
    });

    it('should return the openid and objectType without the name', async () => {
      const openid = 'http://www.example.com';
      await assertIdsActor({ openid });
    });
  };
};
