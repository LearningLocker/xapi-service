interface Result {
  readonly id: string;
  readonly content: any;
  readonly contentType: string;
  readonly updatedAt: Date;
  readonly etag: string;
  readonly extension: string;
}

export default Result;
