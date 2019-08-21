import createSubStatement from '../../utils/createSubStatement';
import assertFilteredStatementRefs from '../utils/assertFilteredStatementRefs';
import assertFilteredStatements from '../utils/assertFilteredStatements';
import actorTest from './utils/actorTest';

const createActor = (object: any) => {
  return createSubStatement({ object });
};

describe('get statements by agent in sub statement object', () => {
  actorTest(assertFilteredStatements)(createActor, true);
});

describe('get statements by agent in sub statement object with references', () => {
  actorTest(assertFilteredStatementRefs)(createActor, true);
});
