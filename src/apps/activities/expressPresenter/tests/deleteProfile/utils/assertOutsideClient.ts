import { StatusCodes } from 'http-status-codes';
import deleteProfile from './deleteProfile';

export default async () => {
  await deleteProfile().expect(StatusCodes.NO_CONTENT);
};
