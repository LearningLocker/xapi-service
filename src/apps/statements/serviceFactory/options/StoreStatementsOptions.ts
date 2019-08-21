import AttachmentModel from '../../models/AttachmentModel';
import ClientModel from '../../models/ClientModel';

interface StoreStatementsOptions {
  readonly models: any[];
  readonly attachments: AttachmentModel[];
  readonly client: ClientModel;
}

export default StoreStatementsOptions;
