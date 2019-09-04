/* tslint:disable:no-let */
import { isPlainObject } from 'lodash';
import NonJsonObject from '../errors/NonJsonObject';
import PatchProfileOptions from '../repoFactory/options/PatchProfileOptions';
import { jsonContentType } from '../utils/constants';
import Config from './Config';
import checkEtag from './utils/checkEtag';
import checkMaxEtags from './utils/checkMaxEtags';
import createProfile from './utils/createProfile';
import matchUniqueProfile from './utils/matchUniqueProfile';

export default (config: Config) => {
  return async (opts: PatchProfileOptions): Promise<void> => {
    // Patches the content if the profile does already exist.
    let isExistingProfile = false;
    const { activityId, profileId, client, ifMatch, ifNoneMatch } = opts;
    checkMaxEtags(ifMatch, ifNoneMatch);
    config.state.activityProfiles = config.state.activityProfiles.map((profile) => {
      const isMatch = matchUniqueProfile({ client, activityId, profile, profileId });
      const isJson = (
        isMatch &&
        profile.contentType === jsonContentType &&
        isPlainObject(profile.content)
      );

      if (!isMatch) {
        return profile;
      }

      checkEtag({ profile, ifMatch, ifNoneMatch });

      isExistingProfile = true;
      if (!isJson) {
        throw new NonJsonObject();
      }

      return {
        ...profile,

        // Merges top-level properties in content.
        content: {
          ...profile.content,
          ...opts.content,
        },
        etag: opts.etag,
        extension: 'json',

        // Updates updatedAt time.
        updatedAt: new Date(),
      };
    });

    // Creates the Profile if the profile doesn't already exist.
    if (!isExistingProfile) {
      createProfile(config, opts);
    }
  };
};
