import Member from 'jscommons/dist/utils/Member';

export interface Opts {
  readonly lrs_id: string;
  readonly hash: string;
  readonly contentType: string;
}

export interface Result {
  readonly stream: NodeJS.ReadableStream;
  readonly contentLength?: number;
}

type Signature = Member<Opts, Result>;

export default Signature;
