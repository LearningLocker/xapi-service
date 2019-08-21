import createIdsStatement from '../../../utils/createIdsStatement';
import createStatement from '../../../utils/createStatement';
import setupIdsTest from './setupIdsTest';

const createIdsVerb = (id: any): any => {
  return {
    id,
  };
};

const createExactVerb = (id: any): any => {
  return {
    display: {},
    ...createIdsVerb(id),
  };
};

export default (
  createVerbStatement: (verb: any) => any,
  createIdsVerbStatement: (verb: any) => any = createVerbStatement,
) => {
  const assertIdsStatements = setupIdsTest();

  const assertIdsVerb = async (id: any) => {
    const exactStatement = createStatement(createVerbStatement(createExactVerb(id)));
    const expectedStatement = createIdsStatement(createIdsVerbStatement(createIdsVerb(id)));
    await assertIdsStatements(exactStatement, expectedStatement);
  };

  it('should return the id without the display', async () => {
    await assertIdsVerb('http://www.example.com/verb');
  });
};
