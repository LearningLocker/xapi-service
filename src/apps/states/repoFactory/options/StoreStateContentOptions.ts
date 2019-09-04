interface Options {
  readonly key: string;
  readonly content: NodeJS.ReadableStream;
  readonly lrs_id: string;
  readonly contentType: string;
}

export default Options;
