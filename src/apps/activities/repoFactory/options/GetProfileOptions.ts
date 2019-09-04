import ClientModel from '../../models/ClientModel';

interface Options {
  readonly client: ClientModel;
  readonly activityId: string;
  readonly profileId: string;
}

export default Options;
