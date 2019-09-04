import { NO_CONTENT } from 'http-status-codes';
import ClientModel from '../../../../models/ClientModel';
import assertProfile from '../../../../utils/assertProfile';
import deleteProfile from './deleteProfile';

export default async (client: ClientModel, content: string) => {
  await deleteProfile().expect(NO_CONTENT);
  await assertProfile(content, { client });
};
