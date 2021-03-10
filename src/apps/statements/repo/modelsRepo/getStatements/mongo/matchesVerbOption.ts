import matchesModel from './matchesModel';

const matcher = (verb: string) => {
  return {
    verbs: verb,
  };
};

export default matchesModel(matcher, (opts) => {
  return opts.verb;
});
