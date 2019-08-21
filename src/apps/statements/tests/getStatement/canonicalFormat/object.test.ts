import canonicalActivityTest from './utils/canonicalActivityTest';
import createActivity from './utils/createActivity';

describe('get canonical statement object', () => {
  canonicalActivityTest((definition: any) => {
    return {
      object: createActivity(definition),
    };
  });
});
