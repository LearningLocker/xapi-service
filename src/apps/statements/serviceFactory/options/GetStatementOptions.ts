import ClientModel from '../../models/ClientModel';
import StatementsResultOptions from './StatementsResultOptions';

interface GetStatementOptions extends StatementsResultOptions {
  id: string;
  voided: boolean;
  client: ClientModel;
}

export default GetStatementOptions;
