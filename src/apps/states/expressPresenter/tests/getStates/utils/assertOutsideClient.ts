import { OK } from 'http-status-codes';
import getStates from './getStates';

export default async () => {
  await getStates().expect(OK, []);
};
