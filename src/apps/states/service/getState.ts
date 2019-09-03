import stringToStream from 'string-to-stream';
import GetStateOptions from '../serviceFactory/options/GetStateOptions';
import GetStateResult from '../serviceFactory/results/GetStateResult';
import { jsonContentType } from '../utils/constants';
import Config from './Config';
import checkStateReadScopes from './utils/checkStateReadScopes';
import validateActivityId from './utils/validateActivityId';
import validateAgent from './utils/validateAgent';
import validateRegistration from './utils/validateRegistration';

export default (config: Config) => {
  return async (opts: GetStateOptions): Promise<GetStateResult> => {
    checkStateReadScopes(opts.client.scopes);
    validateActivityId(opts.activityId);
    validateAgent(opts.agent);
    validateRegistration(opts.registration);

    const state = await config.repo.getState({
      activityId: opts.activityId,
      agent: opts.agent,
      client: opts.client,
      registration: opts.registration,
      stateId: opts.stateId,
    });

    if (state.content !== undefined) {
      const content = (
        state.contentType === jsonContentType
          ? JSON.stringify(state.content)
          : state.content
      );
      return {
        content: stringToStream(content),
        contentType: state.contentType,
        etag: state.etag,
        updatedAt: state.updatedAt,
      };
    }

    const stateContentResult = await config.repo.getStateContent({
      key: `${state.id}.${state.extension}`,
      lrs_id: opts.client.lrs_id,
    });
    return {
      content: stateContentResult.content,
      contentType: state.contentType,
      etag: state.etag,
      updatedAt: state.updatedAt,
    };
  };
};
