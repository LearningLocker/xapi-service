import { Opts } from '../Signature';

export default (opts: Opts) => {
  return opts.until === undefined
    ? {}
    : {
        stored: { $lte: new Date(opts.until) },
      };
};
