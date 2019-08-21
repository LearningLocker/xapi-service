import boolean from 'boolean';
import ClientModel from '../../../models/ClientModel';
import StatementsResultOptions from '../../../serviceFactory/options/StatementsResultOptions';

export default (queryParams: any, client: ClientModel): StatementsResultOptions => {
  return {
    format: queryParams.format,
    attachments:
      queryParams.attachments !== undefined ? boolean(queryParams.attachments) : undefined,
    client,
  };
};
