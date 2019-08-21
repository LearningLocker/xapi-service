interface AttachmentModel {
  readonly stream: NodeJS.ReadableStream;
  readonly hash: string;
  readonly contentLength?: number;
  readonly contentType: string;
}

export default AttachmentModel;
