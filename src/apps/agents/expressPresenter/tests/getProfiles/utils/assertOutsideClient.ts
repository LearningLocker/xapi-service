import { StatusCodes } from 'http-status-codes';
import getProfiles from './getProfiles';

export default async () => {
  await getProfiles().expect(StatusCodes.OK, []);
};
