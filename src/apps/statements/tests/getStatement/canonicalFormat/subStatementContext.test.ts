import createSubStatementContext from '../../utils/createSubStatementContext';
import canonicalActivityTest from './utils/canonicalActivityTest';
import createActivity from './utils/createActivity';

const canonicalContextActivityTest = (contextActivityType: string) => {
  describe(`get canonical statement sub statement ${contextActivityType}`, () => {
    canonicalActivityTest((definition: any) => {
      return createSubStatementContext({
        [contextActivityType]: [createActivity(definition)],
      });
    });
  });
};

canonicalContextActivityTest('parent');
canonicalContextActivityTest('grouping');
canonicalContextActivityTest('category');
canonicalContextActivityTest('other');
