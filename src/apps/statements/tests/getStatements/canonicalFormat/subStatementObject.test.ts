import createSubStatement from '../../utils/createSubStatement';
import canonicalObjectTest from './utils/canonicalObjectTest';

describe('get canonical statements sub statement object', () => {
  canonicalObjectTest((object: any) => {
    return createSubStatement({ object });
  });
});
