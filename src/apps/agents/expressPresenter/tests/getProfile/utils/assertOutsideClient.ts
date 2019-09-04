import { NOT_FOUND } from 'http-status-codes';
import getProfile from './getProfile';

export default async () => {
  await getProfile().expect(NOT_FOUND);
};
