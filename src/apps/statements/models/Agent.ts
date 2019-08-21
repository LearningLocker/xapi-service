import Account from './Account';

interface Agent {
  objectType: 'Agent';
  mbox?: string;
  openid?: string;
  mbox_sha1sum?: string;
  account?: Account;
}

export default Agent;
