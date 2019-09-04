export default interface Result {
  readonly content: NodeJS.ReadableStream;
  readonly contentType: string;
  readonly etag: string;
  readonly updatedAt: Date;
}
