import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import CreateAttachmentsSignature from './createAttachments/Signature';
import GetAttachmentSignature from './getAttachment/Signature';

export default interface StorageRepo extends CommonRepo {
  readonly createAttachments: CreateAttachmentsSignature;
  readonly getAttachment: GetAttachmentSignature;
}
