import Account from './Account';

interface FilterAgent {
  mbox?: string;
  openid?: string;
  mbox_sha1sum?: string;
  account?: Account;
}

export default FilterAgent;
