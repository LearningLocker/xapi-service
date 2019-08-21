import CommonService from 'jscommons/dist/serviceFactory/Service';
import StatementsResult from '../models/StatementsResult';
import GetClientOptions from './options/GetClientOptions';
import GetFullActivityOptions from './options/GetFullActivityOptions';
import GetStatementOptions from './options/GetStatementOptions';
import GetStatementsOptions from './options/GetStatementsOptions';
import StoreStatementsOptions from './options/StoreStatementsOptions';
import GetClientResult from './results/GetClientResult';
import GetFullActivityResult from './results/GetFullActivityResult';

interface Service extends CommonService {
  readonly getClient: (opts: GetClientOptions) => Promise<GetClientResult>;
  readonly storeStatements: (opts: StoreStatementsOptions) => Promise<string[]>;
  readonly getFullActivity: (opts: GetFullActivityOptions) => Promise<GetFullActivityResult>;
  readonly getStatement: (opts: GetStatementOptions) => Promise<StatementsResult>;
  readonly getStatements: (opts: GetStatementsOptions) => Promise<StatementsResult>;
}

export default Service;
