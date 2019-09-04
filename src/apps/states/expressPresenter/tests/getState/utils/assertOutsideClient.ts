import { NOT_FOUND } from 'http-status-codes';
import getState from './getState';

export default async () => {
  await getState().expect(NOT_FOUND);
};
