import createSubStatement from '../../utils/createSubStatement';
import canonicalTest from './utils/canonicalTest';

const createVerb = (display: any): any => {
  return {
    id: 'http://www.example.com/verb',
    display,
  };
};

describe('get canonical statement verb', () => {
  canonicalTest((display: any) => {
    return {
      verb: createVerb(display),
    };
  });
});

describe('get canonical statement sub statement verb', () => {
  canonicalTest((display: any) => {
    return createSubStatement({
      verb: createVerb(display),
    });
  });
});
