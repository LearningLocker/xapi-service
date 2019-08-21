interface Part {
  readonly stream: NodeJS.ReadableStream;
  readonly headers: object;
}

export default Part;
