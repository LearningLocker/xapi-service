import IfMatch from '../../errors/IfMatch';
import IfNoneMatch from '../../errors/IfNoneMatch';
import Profile from '../../models/Profile';

export interface Options {
  readonly profile: Profile;
  readonly ifMatch?: string;
  readonly ifNoneMatch?: string;
}

export default ({ profile, ifMatch, ifNoneMatch }: Options) => {
  if (ifMatch !== undefined && profile.etag !== ifMatch) {
    throw new IfMatch();
  }

  if (ifNoneMatch !== undefined && ifNoneMatch === '*') {
    throw new IfNoneMatch();
  }
};
