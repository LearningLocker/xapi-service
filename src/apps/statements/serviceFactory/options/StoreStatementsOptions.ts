import AttachmentModel from '../../models/AttachmentModel';
import ClientModel from '../../models/ClientModel';

interface StoreStatementsOptions {
  models: any[];
  attachments: AttachmentModel[];
  client: ClientModel;
}

export default StoreStatementsOptions;
