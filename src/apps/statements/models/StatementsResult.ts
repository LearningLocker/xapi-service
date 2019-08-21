import AttachmentModel from './AttachmentModel';
import IdFormattedStatement from './IdFormattedStatement';
import Statement from './Statement';

interface StatementsResult {
  readonly attachments: AttachmentModel[];
  readonly statements: (Statement | IdFormattedStatement)[];
  readonly cursor?: string;
}

export default StatementsResult;
