import canonicalObjectTest from './utils/canonicalObjectTest';

describe('get canonical statements object', () => {
  canonicalObjectTest((object: any) => {
    return { object };
  });
});
