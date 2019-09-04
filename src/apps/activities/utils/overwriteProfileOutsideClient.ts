import ClientModel from '../models/ClientModel';
import createTextProfile from './createTextProfile';

export default async (client: ClientModel) => {
  await createTextProfile({ client });
};
