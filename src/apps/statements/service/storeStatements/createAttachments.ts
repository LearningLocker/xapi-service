import AttachmentModel from '../../models/AttachmentModel';
import removeDuplicates from '../../utils/removeDuplicates';
import Config from '../Config';

export default async (
  config: Config,
  attachments: AttachmentModel[],
  lrsId: string,
): Promise<void> => {
  /* istanbul ignore next */
  if (!config.enableAttachmentCreation) { return; }

  const uniqueAttachments = removeDuplicates(attachments, (attachment) => {
    return attachment.hash;
  });
  await config.repo.createAttachments({
    models: uniqueAttachments,
    lrs_id: lrsId,
  });
};
