import { Opts } from '../Signature';

export default (opts: Opts) => {
  return opts.since === undefined
    ? {}
    : {
        stored: { $gt: new Date(opts.since) },
      };
};
