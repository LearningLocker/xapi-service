import ClientModel from '../../models/ClientModel';

export default interface Options {
  readonly activityId: string;
  readonly client: ClientModel;
  readonly since?: string;
}
