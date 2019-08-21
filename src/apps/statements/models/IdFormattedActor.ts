import Account from './Account';

interface IdFormattedActor {
  objectType?: 'Agent'|'Group';
  mbox?: string;
  openid?: string;
  mbox_sha1sum?: string;
  account?: Account;
  member?: IdFormattedActor[];
}

export default IdFormattedActor;
