import ClientModel from '../../../../models/ClientModel';
import assertState from '../../../../utils/assertState';
import deleteState from './deleteState';

export default async (client: ClientModel, content: string) => {
  await deleteState();
  await assertState(content, { client });
};
