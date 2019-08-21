import StoredStatementModel from '../../../../models/StoredStatementModel';
import { Opts } from '../Signature';

export default (model: StoredStatementModel, opts: Opts): boolean => {
  if (opts.cursor === undefined) {
    return true;
  }

  return opts.ascending ? model._id > opts.cursor : model._id < opts.cursor;
};
