import Account from './Account';

interface FilterAgent {
  readonly mbox?: string;
  readonly openid?: string;
  readonly mbox_sha1sum?: string;
  readonly account?: Account;
}

export default FilterAgent;
