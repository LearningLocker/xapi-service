import ClientModel from '../../models/ClientModel';

interface GetFullActivityOptions {
  readonly activityId: string;
  readonly client: ClientModel;
}

export default GetFullActivityOptions;
