import canonicalTest from './canonicalTest';

export default (createActivityStatement: (definition: any) => any) => {
  describe('name', () => {
    canonicalTest((name: any) => {
      return createActivityStatement({ name });
    });
  });

  describe('description', () => {
    canonicalTest((description: any) => {
      return createActivityStatement({ description });
    });
  });
};
