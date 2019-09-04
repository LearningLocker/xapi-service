import { NO_CONTENT } from 'http-status-codes';
import ClientModel from '../../../../models/ClientModel';
import assertState from '../../../../utils/assertState';
import deleteState from './deleteState';

export default async (client: ClientModel, content: string) => {
  await deleteState().expect(NO_CONTENT);
  await assertState(content, { client });
};
