import ClientModel from '../../models/ClientModel';
import StatementsResultOptions from './StatementsResultOptions';

interface GetStatementOptions extends StatementsResultOptions {
  readonly id: string;
  readonly voided: boolean;
  readonly client: ClientModel;
}

export default GetStatementOptions;
