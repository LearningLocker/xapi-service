import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import DeleteStateOptions from './options/DeleteStateOptions';
import DeleteStatesOptions from './options/DeleteStatesOptions';
import GetStateOptions from './options/GetStateOptions';
import GetStatesOptions from './options/GetStatesOptions';
import OverwriteStateOptions from './options/OverwriteStateOptions';
import PatchStateOptions from './options/PatchStateOptions';
import DeleteStateResult from './results/DeleteStateResult';
import DeleteStatesResult from './results/DeleteStatesResult';
import GetStateResult from './results/GetStateResult';
import GetStatesResult from './results/GetStatesResult';
import OverwriteStateResult from './results/OverwriteStateResult';

interface Repo extends CommonRepo {
  readonly deleteState: (opts: DeleteStateOptions) => Promise<DeleteStateResult>;
  readonly deleteStates: (opts: DeleteStatesOptions) => Promise<DeleteStatesResult>;
  readonly getState: (opts: GetStateOptions) => Promise<GetStateResult>;
  readonly getStates: (opts: GetStatesOptions) => Promise<GetStatesResult>;
  readonly overwriteState: (opts: OverwriteStateOptions) => Promise<OverwriteStateResult>;
  readonly patchState: (opts: PatchStateOptions) => Promise<void>;
}

export default Repo;
