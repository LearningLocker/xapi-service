import Account from '../../models/Account';

interface Result {
  readonly objectType: string;
  readonly name: string[];
  readonly mbox: string[];
  readonly mbox_sha1sum: string[];
  readonly openid: string[];
  readonly account: Account[];
}

export default Result;
