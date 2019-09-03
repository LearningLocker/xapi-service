import Account from './Account';

interface Model {
  readonly mbox?: string;
  readonly mbox_sha1sum?: string;
  readonly openid?: string;
  readonly account?: Account;
}

export default Model;
