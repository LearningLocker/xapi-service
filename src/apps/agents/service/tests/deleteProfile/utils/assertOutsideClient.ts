import ClientModel from '../../../../models/ClientModel';
import assertProfile from '../../../../utils/assertProfile';
import deleteProfile from './deleteProfile';

export default async (client: ClientModel, content: string) => {
  await deleteProfile();
  await assertProfile(content, { client });
};
