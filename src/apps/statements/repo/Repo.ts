import AuthFacade from './authRepo/Facade';
import EventsFacade from './eventsRepo/Facade';
import ModelsFacade from './modelsRepo/Facade';
import StorageFacade from './storageRepo/Facade';

export default interface Repo extends AuthFacade, EventsFacade, ModelsFacade, StorageFacade { }
