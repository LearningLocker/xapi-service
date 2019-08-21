import { ObjectID } from 'mongodb';
import { Opts } from '../Signature';

export default (opts: Opts): object => {
  if (opts.cursor === undefined) {
    return {};
  }

  return {
    _id: (
      opts.ascending
        ? { $gt: new ObjectID(opts.cursor) }
        : { $lt: new ObjectID(opts.cursor) }
    ),
  };
};
