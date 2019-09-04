import AuthRepo from './AuthRepo';
import ModelsRepo from './ModelsRepo';
import StorageRepo from './StorageRepo';

interface Repo extends AuthRepo, ModelsRepo, StorageRepo {}

export default Repo;
