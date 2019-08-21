import Account from './Account';

interface Agent {
  readonly objectType: 'Agent';
  readonly mbox?: string;
  readonly openid?: string;
  readonly mbox_sha1sum?: string;
  readonly account?: Account;
}

export default Agent;
