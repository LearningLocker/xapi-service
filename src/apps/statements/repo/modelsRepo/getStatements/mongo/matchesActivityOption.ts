import { Opts } from '../Signature';
import matchesModel from './matchesModel';

const matcher = (activity: string, opts: Opts): Object => {
  if (opts.related_activities === true) {
    return { relatedActivities: activity };
  }
  return { activities: activity };
};

export default matchesModel<string>(matcher, (opts) => {
  return opts.activity;
});
