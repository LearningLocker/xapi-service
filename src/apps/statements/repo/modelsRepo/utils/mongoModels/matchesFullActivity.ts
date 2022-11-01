import { ObjectId } from 'mongodb';

export interface MatchFullActivityOptions {
  readonly activityId: string;
  readonly lrsId: ObjectId;
  readonly organisationId: ObjectId;
}

export default (opts: MatchFullActivityOptions) => {
  return {
    organisation: opts.organisationId,
    lrs_id: opts.lrsId,
    activityId: opts.activityId,
  };
};
