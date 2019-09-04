import { NO_CONTENT } from 'http-status-codes';
import deleteProfile from './deleteProfile';

export default async () => {
  await deleteProfile().expect(NO_CONTENT);
};
