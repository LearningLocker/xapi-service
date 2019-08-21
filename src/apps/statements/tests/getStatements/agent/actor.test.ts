import assertFilteredStatementRefs from '../utils/assertFilteredStatementRefs';
import assertFilteredStatements from '../utils/assertFilteredStatements';
import actorTest from './utils/actorTest';

const createActor = (actor: any) => {
  return { actor };
};

describe('get statements by agent in actor', () => {
  actorTest(assertFilteredStatements)(createActor);
});

describe('get statements by agent in actor with references', () => {
  actorTest(assertFilteredStatementRefs)(createActor);
});
