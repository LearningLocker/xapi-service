interface Result {
  readonly states: {
    readonly id: string;
    readonly content: any;
    readonly extension: string;
  }[];
}

export default Result;
