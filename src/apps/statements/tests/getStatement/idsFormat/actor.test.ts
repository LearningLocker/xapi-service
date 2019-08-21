import actorTest from './utils/actorTest';

describe('get ids statement in actor', () => {
  actorTest((actor: any): any => {
    return { actor };
  });
});
