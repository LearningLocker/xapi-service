import { ObjectID } from 'mongodb';

export interface MatchFullActivityOptions {
  // FIXME: Why do we use the string and the objectId types together?
  readonly activityId: string;
  readonly lrsId: ObjectID;
  readonly organisationId: ObjectID;
}

export default (opts: MatchFullActivityOptions) => {
  return {
    organisation: opts.organisationId,
    lrs_id: opts.lrsId,
    activityId: opts.activityId,
  };
};
