import config from '../../../config';
import logger from '../../../logger';
import tracker from '../../../tracker';
import repo from '../repo';
import service from '../service';
import Service from './Service';

export default (): Service => {
  return service({
    repo,
    tracker,
    logger,
    awaitUpdates: config.statementsService.awaitUpdates,
    enableActorLowerCasing: config.statementsService.enableActorLowerCasing,
    enableActivityUpdates: config.statementsService.enableActivityUpdates,
    enableAttachmentCreation: config.statementsService.enableAttachmentCreation,
    enableAttachmentValidation: config.statementsService.enableAttachmentValidation,
    enableConflictChecks: config.statementsService.enableConflictChecks,
    enableNullRemoval: config.statementsService.enableNullRemoval,
    enableReferencing: config.statementsService.enableReferencing,
    enableStatementCreation: config.statementsService.enableStatementCreation,
    enableVoiding: config.statementsService.enableVoiding,
    enableVoidingChecks: config.statementsService.enableVoidingChecks,
  });
};
