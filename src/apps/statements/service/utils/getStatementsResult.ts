import { defaultTo } from 'lodash';
import StatementsResult from '../../models/StatementsResult';
import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import StatementsResultOptions from '../../serviceFactory/options/StatementsResultOptions';
import Config from '../Config';
import formatStatements from '../utils/formatStatements';
import getAttachments from '../utils/getAttachments';

export default async (
  config: Config,
  opts: StatementsResultOptions,
  models: UnstoredStatementModel[],
): Promise<StatementsResult> => {
  const attachmentsOpt = opts.attachments === true;
  const formatOpt = defaultTo(opts.format, 'exact');
  const langsOpt = defaultTo(opts.langs, []);
  const attachments = await getAttachments(config, models, attachmentsOpt, opts.client.lrs_id);
  const statements = formatStatements(models, formatOpt, langsOpt);
  return { statements, attachments };
};
