import GetClientOptions from './options/GetClientOptions';
import GetClientResult from './results/GetClientResult';

interface Repo {
  readonly getClient: (opts: GetClientOptions) => Promise<GetClientResult>;
}

export default Repo;
