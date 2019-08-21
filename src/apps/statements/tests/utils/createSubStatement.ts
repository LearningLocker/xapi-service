import createStatement from './createStatement';

export default (overrides: any) => {
  return {
    object: {
      objectType: 'SubStatement',
      ...createStatement(overrides),
    },
  };
};
