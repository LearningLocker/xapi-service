import { StatusCodes } from 'http-status-codes';
import getState from './getState';

export default async () => {
  await getState().expect(StatusCodes.NOT_FOUND);
};
