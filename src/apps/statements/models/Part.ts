interface Part {
  readonly stream: NodeJS.ReadableStream;
  readonly headers: Record<string, string>;
}

export default Part;
