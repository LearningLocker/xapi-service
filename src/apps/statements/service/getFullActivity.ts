import GetFullActivityOptions from '../serviceFactory/options/GetFullActivityOptions';
import GetFullActivityResult from '../serviceFactory/results/GetFullActivityResult';
import Config from './Config';
import checkProfileReadScopes from './utils/checkProfileReadScopes';

export default (config: Config) => {
  return async (opts: GetFullActivityOptions): Promise<GetFullActivityResult> => {
    checkProfileReadScopes(opts.client.scopes);
    const fullActivityResult = await config.repo.getFullActivity(opts);
    return {
      objectType: 'Activity',
      id: fullActivityResult.id,
      definition: {
        name: fullActivityResult.name,
        description: fullActivityResult.description,
        extensions: fullActivityResult.extensions,
        ...(
          fullActivityResult.moreInfo !== undefined
            ? { moreInfo: fullActivityResult.moreInfo }
            : {}
        ),
        ...(
          fullActivityResult.type !== undefined
            ? { type: fullActivityResult.type }
            : {}
        ),
      },
      ...(
        fullActivityResult.context !== undefined
          ? { context: fullActivityResult.context }
          : {}
      ),
    };
  };
};
