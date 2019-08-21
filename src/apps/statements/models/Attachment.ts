import LanguageMap from './LanguageMap';

interface Attachment {
  sha2: string;
  fileUrl?: string;
  contentType: string;
  usageType: string;
  display: LanguageMap;
  length: number;
  description?: LanguageMap;
}

export default Attachment;
