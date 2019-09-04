import Account from './Account';
import Actor from './Actor';

interface Model {
  readonly objectType: 'Group';
  readonly mbox?: string;
  readonly openid?: string;
  readonly mbox_sha1sum?: string;
  readonly account?: Account;
  readonly member?: Actor[];
}

export default Model;
