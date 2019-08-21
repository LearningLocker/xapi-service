import StoredStatementModel from '../../../../models/StoredStatementModel';
import { Opts } from '../Signature';

export default (model: StoredStatementModel, opts: Opts): boolean => {
  return (
    opts.registration === undefined ? true :
      model.registrations.indexOf(opts.registration) > -1
  );
};
