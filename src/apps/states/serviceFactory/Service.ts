import CommonService from 'jscommons/dist/serviceFactory/Service';
import DeleteStateOptions from './options/DeleteStateOptions';
import DeleteStatesOptions from './options/DeleteStatesOptions';
import GetClientOptions from './options/GetClientOptions';
import GetStateOptions from './options/GetStateOptions';
import GetStatesOptions from './options/GetStatesOptions';
import OverwriteStateOptions from './options/OverwriteStateOptions';
import PatchStateOptions from './options/PatchStateOptions';
import GetClientResult from './results/GetClientResult';
import GetStateResult from './results/GetStateResult';
import GetStatesResult from './results/GetStatesResult';

interface Service extends CommonService {
  readonly deleteState: (opts: DeleteStateOptions) => Promise<void>;
  readonly deleteStates: (opts: DeleteStatesOptions) => Promise<void>;
  readonly getClient: (opts: GetClientOptions) => Promise<GetClientResult>;
  readonly getState: (opts: GetStateOptions) => Promise<GetStateResult>;
  readonly getStates: (opts: GetStatesOptions) => Promise<GetStatesResult>;
  readonly overwriteState: (opts: OverwriteStateOptions) => Promise<void>;
  readonly patchState: (opts: PatchStateOptions) => Promise<void>;
}

export default Service;
