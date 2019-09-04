import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import DeleteProfileContentOptions from './options/DeleteProfileContentOptions';
import GetProfileContentOptions from './options/GetProfileContentOptions';
import StoreProfileContentOptions from './options/StoreProfileContentOptions';
import GetProfileContentResult from './results/GetProfileContentResult';

interface Repo extends CommonRepo {
  readonly deleteProfileContent: (opts: DeleteProfileContentOptions) => Promise<void>;
  readonly getProfileContent: (opts: GetProfileContentOptions) => Promise<GetProfileContentResult>;
  readonly storeProfileContent: (opts: StoreProfileContentOptions) => Promise<void>;
}

export default Repo;
