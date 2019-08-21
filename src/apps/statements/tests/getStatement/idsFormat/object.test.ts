import objectTest from './utils/objectTest';

describe('get ids statement in object', () => {
  objectTest((object: any): any => {
    return { object };
  });
});
