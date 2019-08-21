import createSubStatement from '../../utils/createSubStatement';
import assertFilteredStatementRefs from '../utils/assertFilteredStatementRefs';
import assertFilteredStatements from '../utils/assertFilteredStatements';
import groupTest from './utils/groupTest';

const createActor = (team: any) => {
  return createSubStatement({ context: { team } });
};

describe('get statements by agent in sub statement team', () => {
  groupTest(assertFilteredStatements)(createActor, true);
});

describe('get statements by agent in sub statement team with references', () => {
  groupTest(assertFilteredStatementRefs)(createActor, true);
});
