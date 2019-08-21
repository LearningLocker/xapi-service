import Member from 'jscommons/dist/utils/Member';

export interface Opts {
  readonly ids: string[];
}

type Signature = Member<Opts, void>;

export default Signature;
