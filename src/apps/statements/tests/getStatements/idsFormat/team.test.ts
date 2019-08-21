import groupTest from './utils/groupTest';

describe('get ids statements in team', () => {
  groupTest((team: any): any => {
    return { context: { team } };
  });
});
