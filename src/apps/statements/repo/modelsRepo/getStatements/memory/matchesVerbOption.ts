import StoredStatementModel from '../../../../models/StoredStatementModel';
import { Opts } from '../Signature';

export default (model: StoredStatementModel, opts: Opts): boolean => {
  return (
    opts.verb === undefined ? true :
      model.verbs.indexOf(opts.verb) > -1
  );
};
