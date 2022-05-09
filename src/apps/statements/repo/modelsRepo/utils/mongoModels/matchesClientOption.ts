import { includes, intersection } from 'lodash';
import { ObjectId } from 'mongodb';
import ClientModel from '../../../../models/ClientModel';
import * as scopes from '../../../../utils/scopes';

const READ_ALL_SCOPES = [
  scopes.ALL,
  scopes.ALL_READ,
  scopes.XAPI_ALL,
  scopes.XAPI_READ,
  scopes.XAPI_STATEMENTS_READ,
];

export default (client: ClientModel, enableReadMine = false): Record<string, unknown> => {
  const canOnlyReadMine =
    enableReadMine &&
    intersection(READ_ALL_SCOPES, client.scopes).length === 0 &&
    includes(client.scopes, scopes.XAPI_STATEMENTS_READ_MINE);

  return {
    organisation: new ObjectId(client.organisation),
    lrs_id: new ObjectId(client.lrs_id),
    ...(canOnlyReadMine ? { client: new ObjectId(client._id) } : {}),
  };
};
