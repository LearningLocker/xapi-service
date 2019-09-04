interface Options {
  readonly key: string;
  readonly content: NodeJS.ReadableStream;
  readonly lrs_id: string;
}

export default Options;
