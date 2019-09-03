import OverwriteStateOptions from '../serviceFactory/options/OverwriteStateOptions';
import getFileExtension from '../utils/getFileExtension';
import Config from './Config';
import checkStateWriteScopes from './utils/checkStateWriteScopes';
import createEtag from './utils/createEtag';
import getContent from './utils/getContent';
import validateActivityId from './utils/validateActivityId';
import validateAgent from './utils/validateAgent';
import validateRegistration from './utils/validateRegistration';

export default (config: Config) => {
  return async (opts: OverwriteStateOptions) => {
    checkStateWriteScopes(opts.client.scopes);
    validateActivityId(opts.activityId);
    validateAgent(opts.agent);
    validateRegistration(opts.registration);

    // Update or create State.
    const etag = createEtag();
    const { content, contentType } = await getContent({
      contentType: opts.contentType,
      stream: opts.content,
    });
    const extension = getFileExtension(contentType);

    const overwriteStateResult = await config.repo.overwriteState({
      activityId: opts.activityId,
      agent: opts.agent,
      client: opts.client,
      content,
      contentType,
      etag,
      extension,
      registration: opts.registration,
      stateId: opts.stateId,
    });

    if (content === undefined) {
      await config.repo.storeStateContent({
        content: opts.content,
        contentType,
        key: `${overwriteStateResult.id}.${extension}`,
        lrs_id: opts.client.lrs_id,
      });
    }

    return;
  };
};
