import StoredStatementModel from '../../../../models/StoredStatementModel';
import { Opts } from '../Signature';

export default (model: StoredStatementModel, opts: Opts): boolean => {
  if (opts.activity === undefined) {
    return true;
  }
  if (opts.related_activities === true) {
    return model.relatedActivities.indexOf(opts.activity) > -1;
  }
  return model.activities.indexOf(opts.activity) > -1;
};
