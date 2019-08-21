import { map } from 'lodash';
import StatementsResult from '../../../models/StatementsResult';
import GetStatementsOptions from '../../../serviceFactory/options/GetStatementsOptions';
import StatementsResultOptions from '../../../serviceFactory/options/StatementsResultOptions';
import pickDefined from '../pickDefined';

export interface MoreLinkOptions {
  readonly results: StatementsResult;
  readonly statementsOpts: Partial<GetStatementsOptions>;
  readonly resultOpts: StatementsResultOptions;
  readonly urlPath: string;
}

const encodeOpt = (opt: any) => {
  return opt !== undefined ? encodeURIComponent(opt.toString()) : undefined;
};

export default (opts: MoreLinkOptions) => {
  if (opts.results.cursor === undefined) {
    return '';
  }

  const moreLinkOpts = pickDefined({
    agent: (
      opts.statementsOpts.agent !== undefined
        ? encodeURIComponent(JSON.stringify(opts.statementsOpts.agent))
        : undefined
    ),
    activity: encodeOpt(opts.statementsOpts.activity),
    verb: encodeOpt(opts.statementsOpts.verb),
    related_agents: opts.statementsOpts.related_agents,
    related_activities: opts.statementsOpts.related_activities,
    registration: opts.statementsOpts.registration,
    since: opts.statementsOpts.since,
    until: opts.statementsOpts.until,
    ascending: opts.statementsOpts.ascending,
    limit: opts.statementsOpts.limit,
    skip: opts.statementsOpts.skip,

    format: opts.resultOpts.format,
    attachments: opts.resultOpts.attachments,
    langs: opts.resultOpts.langs,

    cursor: opts.results.cursor,
  });

  const moreLinkParams = map(moreLinkOpts, (value, key) => {
    return value === undefined ? '' : `${key}=${value}`;
  }).filter((param) => {
    return param !== '';
  }).join('&');

  return `${opts.urlPath}?${moreLinkParams}`;
};
