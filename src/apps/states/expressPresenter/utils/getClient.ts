import ClientModel from '../../models/ClientModel';
import Config from '../Config';

export default async (config: Config, authToken = ''): Promise<ClientModel> => {
  const { client } = await config.service.getClient({ authToken });
  const tracker = await config.tracker;
  tracker('org_id', client.organisation);
  tracker('lrs_id', client.lrs_id);
  tracker('client_id', client._id);
  return client;
};
