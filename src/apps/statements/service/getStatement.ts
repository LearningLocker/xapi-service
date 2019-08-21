import checkScopes from 'jscommons/dist/service/utils/checkScopes';
import StatementsResult from '../models/StatementsResult';
import GetStatementOptions from '../serviceFactory/options/GetStatementOptions';
import { STATEMENT_READ_SCOPES } from '../utils/scopes';
import Config from './Config';
import getStatementsResult from './utils/getStatementsResult';

export default (config: Config) => {
  return async (opts: GetStatementOptions): Promise<StatementsResult> => {
    checkScopes(STATEMENT_READ_SCOPES, opts.client.scopes);
    const model = await config.repo.getStatement(opts);
    return getStatementsResult(config, opts, [model]);
  };
};
