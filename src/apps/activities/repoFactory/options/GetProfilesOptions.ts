import ClientModel from '../../models/ClientModel';

interface Options {
  readonly client: ClientModel;
  readonly activityId: string;
  readonly since?: Date;
}

export default Options;
