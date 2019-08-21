import { includes, intersection } from 'lodash';
import ClientModel from '../../../../models/ClientModel';
import StoredStatementModel from '../../../../models/StoredStatementModel';
import * as scopes from '../../../../utils/scopes';

const READ_ALL_SCOPES = [
  scopes.ALL,
  scopes.ALL_READ,
  scopes.XAPI_ALL,
  scopes.XAPI_READ,
  scopes.XAPI_STATEMENTS_READ,
];

export default (model: StoredStatementModel, client: ClientModel, enableReadMine = false) => {
  const canOnlyReadMine = (
    enableReadMine &&
    intersection(READ_ALL_SCOPES, client.scopes).length === 0 &&
    includes(client.scopes, scopes.XAPI_STATEMENTS_READ_MINE)
  );

  return (
    model.organisation === client.organisation &&
    model.lrs_id === client.lrs_id &&
    (canOnlyReadMine ? model.client === client._id : true)
  );
};
