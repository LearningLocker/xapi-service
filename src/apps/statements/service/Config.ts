import Tracker from 'jscommons/dist/tracker/Tracker';
import { LoggerInstance } from 'winston';
import Repo from '../repo/Repo';

interface Config {
  readonly repo: Repo;
  readonly tracker: Promise<Tracker>;
  readonly logger: LoggerInstance;
  readonly enableConflictChecks: boolean;
  readonly enableAttachmentValidation: boolean;
  readonly enableVoidingChecks: boolean;
  readonly enableStatementCreation: boolean;
  readonly enableAttachmentCreation: boolean;
  readonly enableVoiding: boolean;
  readonly enableReferencing: boolean;
  readonly awaitUpdates: boolean;
  readonly enableActivityUpdates: boolean;
  readonly enableNullRemoval: boolean;
  readonly enableActorLowerCasing: boolean;
}

export default Config;
