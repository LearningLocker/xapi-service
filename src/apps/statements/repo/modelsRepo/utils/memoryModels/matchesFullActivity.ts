import FullActivityModel from '../../../../models/FullActivityModel';

export interface MatchFullActivityOptions {
  readonly activityId: string;
  readonly lrsId: string;
  readonly model: FullActivityModel;
  readonly organisationId: string;
}

export default (opts: MatchFullActivityOptions) => {
  return (
    opts.model.organisationId === opts.organisationId &&
    opts.model.lrsId === opts.lrsId &&
    opts.model.activityId === opts.activityId
  );
};
