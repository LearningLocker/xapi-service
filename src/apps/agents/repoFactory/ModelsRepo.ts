import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import DeleteProfileOptions from './options/DeleteProfileOptions';
import GetProfileOptions from './options/GetProfileOptions';
import GetProfilesOptions from './options/GetProfilesOptions';
import HasProfileOptions from './options/HasProfileOptions';
import OverwriteProfileOptions from './options/OverwriteProfileOptions';
import PatchProfileOptions from './options/PatchProfileOptions';
import DeleteProfileResult from './results/DeleteProfileResult';
import GetProfileResult from './results/GetProfileResult';
import GetProfilesResult from './results/GetProfilesResult';
import HasProfileResult from './results/HasProfileResult';
import OverwriteProfileResult from './results/OverwriteProfileResult';

interface Repo extends CommonRepo {
  readonly deleteProfile: (opts: DeleteProfileOptions) => Promise<DeleteProfileResult>;
  readonly getProfile: (opts: GetProfileOptions) => Promise<GetProfileResult>;
  readonly getProfiles: (opts: GetProfilesOptions) => Promise<GetProfilesResult>;
  readonly hasProfile: (opts: HasProfileOptions) => Promise<HasProfileResult>;
  readonly overwriteProfile: (opts: OverwriteProfileOptions) => Promise<OverwriteProfileResult>;
  readonly patchProfile: (opts: PatchProfileOptions) => Promise<void>;
}

export default Repo;
