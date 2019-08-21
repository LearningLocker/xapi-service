import actorTest from './utils/actorTest';

describe('get ids statements in actor', () => {
  actorTest((actor: any): any => {
    return { actor };
  });
});
