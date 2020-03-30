import getNumberOption from 'jscommons/dist/config/getNumberOption';
import checkScopes from 'jscommons/dist/service/utils/checkScopes';
import StatementsResult from '../models/StatementsResult';
import GetStatementsOptions from '../serviceFactory/options/GetStatementsOptions';
import { STATEMENT_READ_SCOPES } from '../utils/scopes';
import Config from './Config';
import getStatementsResult from './utils/getStatementsResult';

const getLimit = (val?: any) => {
  const defaultLimit = 100;
  const limit = getNumberOption(val, defaultLimit);
  if (limit === 0) {
    return defaultLimit;
  }
  return limit;
};

export default (config: Config) => {
  return async (opts: GetStatementsOptions): Promise<StatementsResult> => {
    checkScopes(STATEMENT_READ_SCOPES, opts.client.scopes);

    const limit = getLimit(opts.limit);

    const models = await config.repo.getStatements({
      agent: opts.agent,
      activity: opts.activity,
      verb: opts.verb,
      related_agents: opts.related_agents,
      related_activities: opts.related_activities,
      registration: opts.registration,
      since: opts.since,
      until: opts.until,
      ascending: opts.ascending === undefined ? false : opts.ascending,
      limit: limit + 1,
      skip: opts.skip,
      client: opts.client,
      cursor: opts.cursor,
    });

    const hasMoreModels = models.length > limit;

    const cursorModel = models[models.length - 1];
    const cursor = hasMoreModels
      ? `${cursorModel._id}_${cursorModel.stored.toISOString()}`
      : undefined;

    const resultModels = hasMoreModels ? models.slice(0, models.length - 1) : models;
    const result = await getStatementsResult(config, opts, resultModels);

    return {
      ...result,
      cursor,
    };
  };
};
