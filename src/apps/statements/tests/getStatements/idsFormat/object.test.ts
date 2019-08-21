import objectTest from './utils/objectTest';

describe('get ids statements in object', () => {
  objectTest((object: any): any => {
    return { object };
  });
});
