import { StatusCodes } from 'http-status-codes';
import getProfile from './getProfile';

export default async () => {
  await getProfile().expect(StatusCodes.NOT_FOUND);
};
