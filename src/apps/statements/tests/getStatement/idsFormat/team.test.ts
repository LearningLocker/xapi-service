import groupTest from './utils/groupTest';

describe('get ids statement in team', () => {
  groupTest((team: any): any => {
    return { context: { team } };
  });
});
