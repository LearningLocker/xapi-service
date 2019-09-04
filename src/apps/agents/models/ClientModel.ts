interface Model {
  readonly _id: string;
  readonly organisation: string;
  readonly lrs_id: string;
  readonly isTrusted: boolean;
  readonly scopes: string[];
}

export default Model;
