import matchesModel, { ModelMatcher } from './matchesModel';

const matcher = (registration: string): Object => {
  return {
    registrations: registration,
  };
};

export default matchesModel<string>(matcher, (opts) => {
  return opts.registration;
});
