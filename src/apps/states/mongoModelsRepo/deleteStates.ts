/* tslint:disable:deprecation - find isn't really deprecated */
import DeleteStatesOptions from '../repoFactory/options/DeleteStatesOptions';
import DeleteStatesResult from '../repoFactory/results/DeleteStatesResult';
import Config from './Config';
import { COLLECTION_NAME } from './utils/constants';
import getStatesFilter from './utils/getStatesFilter';

export default (config: Config) => {
  return async (opts: DeleteStatesOptions): Promise<DeleteStatesResult> => {
    const collection = (await config.db()).collection(COLLECTION_NAME);

    const stateFilter = getStatesFilter(opts);

    const stateDocuments = await collection.find(stateFilter)
      .project({ _id: 1, content: 1, extension: 1 })
      .toArray();

    const ids = stateDocuments.map((state: any) => {
      return state._id;
    });

    await collection.deleteMany({ _id: { $in: ids } }, {});

    const deletedStates = stateDocuments.map((state: any) => {
      return {
        content: state.content === null ? undefined : state.content,
        extension: state.extension,
        id: state._id.toString(),
      };
    });
    return { states: deletedStates };
  };
};
