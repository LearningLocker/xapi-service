import LanguageMap from './LanguageMap';

interface Attachment {
  readonly sha2: string;
  readonly fileUrl?: string;
  readonly contentType: string;
  readonly usageType: string;
  readonly display: LanguageMap;
  readonly length: number;
  readonly description?: LanguageMap;
}

export default Attachment;
