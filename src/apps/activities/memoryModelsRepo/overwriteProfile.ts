/* tslint:disable:no-let */
import OverwriteProfileOptions from '../repoFactory/options/OverwriteProfileOptions';
import OverwriteProfileResult from '../repoFactory/results/OverwriteProfileResult';
import Config from './Config';
import checkEtag from './utils/checkEtag';
import checkMaxEtags from './utils/checkMaxEtags';
import createProfile from './utils/createProfile';
import matchUniqueProfile from './utils/matchUniqueProfile';

export default (config: Config) => {
  return async (opts: OverwriteProfileOptions): Promise<OverwriteProfileResult> => {
    // Overwrites the content if the profile does already exist.
    let existingId: string | undefined;
    const { activityId, profileId, client, ifMatch, ifNoneMatch } = opts;
    checkMaxEtags(ifMatch, ifNoneMatch);
    config.state.activityProfiles = config.state.activityProfiles.map((profile) => {
      const isMatch = matchUniqueProfile({ client, activityId, profile, profileId });

      if (!isMatch) {
        return profile;
      }

      checkEtag({ profile, ifMatch, ifNoneMatch });

      existingId = profile.id;
      return {
        ...profile,

        // Overwrites the content and contentType.
        content: opts.content,
        contentType: opts.contentType,
        etag: opts.etag,
        extension: opts.extension,

        // Updates updatedAt time.
        updatedAt: new Date(),
      };
    });

    // Creates the Profile if the profile doesn't already exist.
    if (existingId === undefined) {
      const createdProfile = createProfile(config, opts);
      return { id: createdProfile.id, extension: createdProfile.extension };
    }

    return { id: existingId, extension: '' };
  };
};
