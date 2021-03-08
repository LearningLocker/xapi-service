import { StatusCodes } from 'http-status-codes';
import ClientModel from '../../../../models/ClientModel';
import assertProfile from '../../../../utils/assertProfile';
import deleteProfile from './deleteProfile';

export default async (client: ClientModel, content: string) => {
  await deleteProfile().expect(StatusCodes.NO_CONTENT);
  await assertProfile(content, { client });
};
