import { defaultTo } from 'lodash';
import Timeout from '../../../../errors/Timeout';
import StoredStatementModel from '../../../../models/StoredStatementModel';
import { STATEMENTS_COLLECTION_NAME } from '../../utils/mongoModels/constants';
import FacadeConfig from '../../utils/mongoModels/FacadeConfig';
import matchesClientOption from '../../utils/mongoModels/matchesClientOption';
import { decodeDotsInStatement } from '../../utils/mongoModels/replaceDotsInStatement';
import Signature, { Opts } from '../Signature';
import matchesActivityOption from './matchesActivityOption';
import matchesAgentOption from './matchesAgentOption';
import matchesCursorOption from './matchesCursorOption';
import matchesRegistrationOption from './matchesRegistrationOption';
import matchesSinceOption from './matchesSinceOption';
import matchesUntilOption from './matchesUntilOption';
import matchesVerbOption from './matchesVerbOption';

const filterModels = (opts: Opts): Object => {
  return {
    $and: [
      { voided: false },
      matchesCursorOption(opts),
      matchesClientOption(opts.client, true),
      matchesAgentOption(opts),
      matchesVerbOption(opts),
      matchesActivityOption(opts),
      matchesRegistrationOption(opts),
      matchesUntilOption(opts),
      matchesSinceOption(opts),
    ],
  };
};

const sortModels = (ascending: boolean) => {
  return {
    stored: ascending ? 1 : -1,
    _id: ascending ? 1 : -1,
  };
};

export default (config: FacadeConfig): Signature => {
  return async (opts) => {
    const collection = (await config.db()).collection(STATEMENTS_COLLECTION_NAME);
    const query = filterModels(opts);
    const sort = sortModels(opts.ascending);
    const skip = defaultTo(opts.skip, 0);
    const limit = opts.limit;

    try {
      const models = await collection
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .maxTimeMS(config.maxTimeMs)
        .toArray() as StoredStatementModel[];

      const decodedModels = models.map((model) => {
        const statement = decodeDotsInStatement(model.statement);
        return { ...model, statement };
      });

      return decodedModels;
    } catch (err) {
      // istanbul ignore next - Couldn't test without an unacceptable test duration.
      if (err?.code === 50) {
        throw new Timeout(config.maxTimeMs);
      }
      // istanbul ignore next - Unexpected error.
      throw err;
    }
  };
};
