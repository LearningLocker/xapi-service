import stringToStream from 'string-to-stream';
import GetProfileOptions from '../serviceFactory/options/GetProfileOptions';
import GetProfileResult from '../serviceFactory/results/GetProfileResult';
import Config from './Config';
import checkProfileReadScopes from './utils/checkProfileReadScopes';
import validateAgent from './utils/validateAgent';

export default (config: Config) => {
  return async (opts: GetProfileOptions): Promise<GetProfileResult> => {
    checkProfileReadScopes(opts.client.scopes);
    validateAgent(opts.agent);
    const profile = await config.repo.getProfile({
      agent: opts.agent,
      client: opts.client,
      profileId: opts.profileId,
    });

    if (profile.content !== undefined) {
      return {
        content: stringToStream(JSON.stringify(profile.content)),
        contentType: profile.contentType,
        etag: profile.etag,
        updatedAt: profile.updatedAt,
      };
    }

    const profileContentResult = await config.repo.getProfileContent({
      key: `${profile.id}.${profile.extension}`,
      lrs_id: opts.client.lrs_id,
    });
    return {
      content: profileContentResult.content,
      contentType: profile.contentType,
      etag: profile.etag,
      updatedAt: profile.updatedAt,
    };
  };
};
