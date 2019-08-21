import Attachment from '../../models/Attachment';
import StatementBase from '../../models/StatementBase';
import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import removeDuplicates from '../../utils/removeDuplicates';

const getStatementBaseAttachments = (statement: StatementBase) => {
  const attachments = statement.attachments;
  if (attachments === undefined) { return []; }
  return attachments;
};

export default (models: UnstoredStatementModel[]) => {
  const attachments = models.reduce((results, model) => {
    const statementAttachments = getStatementBaseAttachments(model.statement);
    const subStatementAttachments = (
      model.statement.object.objectType === 'SubStatement'
        ? getStatementBaseAttachments(model.statement.object)
        : []
    );
    return [...results, ...statementAttachments, ...subStatementAttachments];
  }, [] as Attachment[]);

  const uniqueAttachments = removeDuplicates(attachments, (attachment) => {
    return attachment.sha2;
  });

  return uniqueAttachments;
};
