interface AttachmentModel {
  stream: NodeJS.ReadableStream;
  hash: string;
  contentLength?: number;
  contentType: string;
}

export default AttachmentModel;
