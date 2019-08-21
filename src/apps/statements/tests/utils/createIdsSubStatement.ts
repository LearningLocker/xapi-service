import createIdsStatement from './createIdsStatement';

export default (overrides: any) => {
  return {
    object: {
      objectType: 'SubStatement',
      ...createIdsStatement(overrides),
    },
  };
};
