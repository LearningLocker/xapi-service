import { difference, includes } from 'lodash';
import ExtraAttachments from '../../errors/ExtraAttachments';
import MissingAttachments from '../../errors/MissingAttachments';
import AttachmentModel from '../../models/AttachmentModel';
import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import Config from '../Config';
import getStatementsAttachments from '../utils/getStatementsAttachments';

export default (
  config: Config,
  models: UnstoredStatementModel[],
  attachments: AttachmentModel[],
) => {
  /* istanbul ignore next */
  if (!config.enableAttachmentValidation) { return; }

  const attachmentHashes = attachments.map((attachment) => {
    return attachment.hash;
  });
  const statementsAttachments = getStatementsAttachments(models);

  // Checks for attachments defined in statements but not in the attachments.
  const missingHashes = statementsAttachments.filter((attachment) => {
    return !includes(attachmentHashes, attachment.sha2) && attachment.fileUrl === undefined;
  }).map((attachment) => {
    return attachment.sha2;
  });
  if (missingHashes.length > 0) {
    throw new MissingAttachments(missingHashes);
  }

  // Checks for attachments defined in the attachments but not in the statements.
  const statementHashes = statementsAttachments.map((attachment) => {
    return attachment.sha2;
  });
  const extraHashes = difference(attachmentHashes, statementHashes);
  if (extraHashes.length > 0) {
    throw new ExtraAttachments(extraHashes);
  }
};
