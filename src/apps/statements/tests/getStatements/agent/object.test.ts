import assertFilteredStatementRefs from '../utils/assertFilteredStatementRefs';
import assertFilteredStatements from '../utils/assertFilteredStatements';
import actorTest from './utils/actorTest';

const createActor = (object: any) => {
  return { object };
};

describe('get statements by agent in object', () => {
  actorTest(assertFilteredStatements)(createActor);
});

describe('get statements by agent in object with references', () => {
  actorTest(assertFilteredStatementRefs)(createActor);
});
