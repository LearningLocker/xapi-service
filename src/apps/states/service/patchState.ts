import { isPlainObject } from 'lodash';
import NonJsonObject from '../errors/NonJsonObject';
import PatchStateOptions from '../serviceFactory/options/PatchStateOptions';
import { jsonContentType } from '../utils/constants';
import getFileExtension from '../utils/getFileExtension';
import Config from './Config';
import checkStateWriteScopes from './utils/checkStateWriteScopes';
import createEtag from './utils/createEtag';
import getContent from './utils/getContent';
import validateActivityId from './utils/validateActivityId';
import validateAgent from './utils/validateAgent';
import validateRegistration from './utils/validateRegistration';

export default (config: Config) => {
  return async (opts: PatchStateOptions): Promise<void> => {
    const client = opts.client;
    checkStateWriteScopes(client.scopes);
    validateActivityId(opts.activityId);
    validateAgent(opts.agent);
    validateRegistration(opts.registration);

    const { content, contentType } = await getContent({
      contentType: opts.contentType,
      stream: opts.content,
    });
    if (contentType !== jsonContentType) {
      throw new NonJsonObject();
    }
    if (!isPlainObject(content)) {
      throw new NonJsonObject();
    }

    const extension = getFileExtension(contentType);

    const etag = createEtag();
    await config.repo.patchState({
      activityId: opts.activityId,
      agent: opts.agent,
      client,
      content,
      contentType,
      etag,
      extension,
      registration: opts.registration,
      stateId: opts.stateId,
    });
    return;
  };
};
