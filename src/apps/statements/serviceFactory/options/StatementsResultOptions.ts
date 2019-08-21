import ClientModel from '../../models/ClientModel';

interface StatementsResultOptions {
  format?: string;
  attachments?: boolean;
  langs?: string[];
  client: ClientModel;
}

export default StatementsResultOptions;
