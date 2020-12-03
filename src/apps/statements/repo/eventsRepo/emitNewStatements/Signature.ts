import Member from 'jscommons/dist/utils/Member';

export interface Opts {
  readonly statementProperties: string[];
}

type Signature = Member<Opts, void>;

export default Signature;
