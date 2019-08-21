import { Opts } from '../Signature';

export default (opts: Opts): Object => {
  return opts.until === undefined ? {} : {
    stored: { $lte: new Date(opts.until) },
  };
};
