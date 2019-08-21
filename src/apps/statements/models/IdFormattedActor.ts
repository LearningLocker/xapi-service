import Account from './Account';

interface IdFormattedActor {
  readonly objectType?: 'Agent'|'Group';
  readonly mbox?: string;
  readonly openid?: string;
  readonly mbox_sha1sum?: string;
  readonly account?: Account;
  readonly member?: IdFormattedActor[];
}

export default IdFormattedActor;
