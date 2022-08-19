import ClientModel from '../../models/ClientModel';

interface StatementsResultOptions {
  readonly format?: string;
  readonly attachments?: boolean;
  readonly langs?: string[];
  readonly client: ClientModel;
}

export default StatementsResultOptions;
