import boolean from 'boolean';
import GetStatementsOptions from '../../../serviceFactory/options/GetStatementsOptions';
import parseJson from './../../../utils/parseJson';

/**
 * We pass back undefined where possible to avoid extra params being added to the
 * more link unnecessarily
 */
export default (queryParams: any): Partial<GetStatementsOptions> => {
  return {
    agent: (queryParams.agent !== undefined
      ? parseJson(queryParams.agent, ['query', 'agent'])
      : undefined
    ),
    verb:
      queryParams.verb,
    activity:
      queryParams.activity,
    registration:
      queryParams.registration,
    related_activities: (queryParams.related_activities !== undefined
      ? boolean(queryParams.related_activities)
      : undefined
    ),
    related_agents:
      queryParams.related_agents !== undefined ? boolean(queryParams.related_agents) : undefined,
    since:
      queryParams.since,
    until:
      queryParams.until,
    limit:
      queryParams.limit !== undefined ? Number(queryParams.limit) : undefined,
    ascending:
      queryParams.ascending !== undefined ? boolean(queryParams.ascending) : undefined,
    cursor:
      queryParams.cursor,
  };
};
