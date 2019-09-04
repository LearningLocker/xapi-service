import { isPlainObject } from 'lodash';
import streamToString from 'stream-to-string';
import NonJsonObject from '../errors/NonJsonObject';
import PatchProfileOptions from '../serviceFactory/options/PatchProfileOptions';
import { jsonContentType } from '../utils/constants';
import getFileExtension from '../utils/getFileExtension';
import parseJson from '../utils/parseJson';
import Config from './Config';
import checkProfileWriteScopes from './utils/checkProfileWriteScopes';
import createEtag from './utils/createEtag';
import validateActivityId from './utils/validateActivityId';

export default (config: Config) => {
  return async (opts: PatchProfileOptions): Promise<void> => {
    const client = opts.client;
    checkProfileWriteScopes(client.scopes);
    validateActivityId(opts.activityId);

    if (opts.contentType !== jsonContentType) {
      throw new NonJsonObject();
    }

    const content = parseJson(await streamToString(opts.content), ['content']);
    if (!isPlainObject(content)) {
      throw new NonJsonObject();
    }

    const extension = getFileExtension(opts.contentType);

    const etag = createEtag();
    await config.repo.patchProfile({
      activityId: opts.activityId,
      client,
      content,
      contentType: opts.contentType,
      etag,
      extension,
      ifMatch: opts.ifMatch,
      ifNoneMatch: opts.ifNoneMatch,
      profileId: opts.profileId,
    });
    return;
  };
};
