import { filter } from 'bluebird';
import AttachmentModel from '../../models/AttachmentModel';
import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import Config from '../Config';
import getStatementsAttachments from '../utils/getStatementsAttachments';

export default async (
  config: Config,
  models: UnstoredStatementModel[],
  hasAttachments: boolean,
  lrsId: string,
): Promise<AttachmentModel[]> => {
  if (!hasAttachments) {
    return [];
  }

  const attachments = getStatementsAttachments(models);
  const potentialAttachments = attachments.map((attachment) => {
    return {
      fileUrl: attachment.fileUrl,
      hash: attachment.sha2,
      attachmentRequest: config.repo.getAttachment({
        lrs_id: lrsId,
        hash: attachment.sha2,
        contentType: attachment.contentType,
      }),
      contentType: attachment.contentType,
    };
  });
  const storedAttachments = await Promise.resolve(
    filter(potentialAttachments, async (potentialAttachment) => {
      try {
        await potentialAttachment.attachmentRequest;
        return true;
      } catch (err) {
        if (potentialAttachment.fileUrl === undefined) {
          /* istanbul ignore next - only happens if a file incorrectly goes missing */
          throw err;
        }
        return false;
      }
    }),
  );
  const streamedAttachments = storedAttachments.map(async (storedAttachment) => {
    const attachmentResult = await storedAttachment.attachmentRequest;
    return {
      hash: storedAttachment.hash,
      stream: attachmentResult.stream,
      contentLength: attachmentResult.contentLength,
      contentType: storedAttachment.contentType,
    };
  });
  const awaitedAttachments = await Promise.all(streamedAttachments);
  return awaitedAttachments;
};
