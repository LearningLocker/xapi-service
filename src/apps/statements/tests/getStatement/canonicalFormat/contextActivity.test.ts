import createContext from '../../utils/createContext';
import canonicalActivityTest from './utils/canonicalActivityTest';
import createActivity from './utils/createActivity';

const canonicalContextActivityTest = (contextActivityType: string) => {
  describe(`get canonical statement ${contextActivityType}`, () => {
    canonicalActivityTest((definition: any) => {
      return createContext({
        [contextActivityType]: [createActivity(definition)],
      });
    });
  });
};

canonicalContextActivityTest('parent');
canonicalContextActivityTest('grouping');
canonicalContextActivityTest('category');
canonicalContextActivityTest('other');
