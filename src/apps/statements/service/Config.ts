import Tracker from 'jscommons/dist/tracker/Tracker';
import { LoggerInstance } from 'winston';
import Repo from '../repo/Repo';

interface Config {
  repo: Repo;
  tracker: Promise<Tracker>;
  logger: LoggerInstance;
  enableConflictChecks: boolean;
  enableAttachmentValidation: boolean;
  enableVoidingChecks: boolean;
  enableStatementCreation: boolean;
  enableAttachmentCreation: boolean;
  enableVoiding: boolean;
  enableReferencing: boolean;
  awaitUpdates: boolean;
  enableActivityUpdates: boolean;
  enableNullRemoval: boolean;
  enableActorLowerCasing: boolean;
}

export default Config;
