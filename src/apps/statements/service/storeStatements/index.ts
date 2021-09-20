import { PassThrough } from 'stream';
import checkScopes from 'jscommons/dist/service/utils/checkScopes';
import { StatementProcessingPriority } from '../../enums/statementProcessingPriority.enum';
import AttachmentModel from '../../models/AttachmentModel';
import StoreStatementsOptions from '../../serviceFactory/options/StoreStatementsOptions';
import { STATEMENT_WRITE_SCOPES } from '../../utils/scopes';
import Config from '../Config';
import checkAttachments from './checkAttachments';
import checkVoiders from './checkVoiders';
import createAttachments from './createAttachments';
import createStatements from './createStatements';
import getUnstoredModels from './getUnstoredModels';
import postValidationSetup from './postValidationSetup';
import preValidationSetup from './preValidationSetup/preValidationSetup';
import updateFullActivities from './updateFullActivities';
import updateReferences from './updateReferences';
import validateStatements from './validateStatements';
import voidStatements from './voidStatements';

/* istanbul ignore next */
const awaitUpdates = async (config: Config, updates: Promise<any>) => {
  if (config.awaitUpdates) {
    await updates;
  }
};

const cloneAttachments = (attachmentModels: AttachmentModel[]): AttachmentModel[] => {
  return attachmentModels.map((attachmentModel) => {
    return {
      ...attachmentModel,
      stream: attachmentModel.stream.pipe(new PassThrough()),
    };
  });
};

export default (config: Config) => {
  return async ({
    models,
    attachments,
    client,
    priority = StatementProcessingPriority.MEDIUM,
  }: StoreStatementsOptions): Promise<string[]> => {
    checkScopes(STATEMENT_WRITE_SCOPES, client.scopes);
    const preValidatedModels = preValidationSetup(config, models);
    validateStatements(preValidatedModels);
    const clonedAttachments = cloneAttachments(attachments);
    const postValidatedModels = await postValidationSetup(
      preValidatedModels,
      cloneAttachments(attachments),
      client,
      priority,
    );
    const unstoredModels = await getUnstoredModels(config, postValidatedModels, client);
    const voidedObjectIds = await checkVoiders(config, unstoredModels, client);
    checkAttachments(config, postValidatedModels, clonedAttachments);

    await createStatements(config, unstoredModels);

    const statementIds = postValidatedModels.map((postValidatedModel) => {
      return postValidatedModel.statement.id;
    });

    const unstoredStatementProperties = unstoredModels.map((unstoredModel) =>
      JSON.stringify({
        statementId: unstoredModel.statement.id,
        organisationId: unstoredModel.organisation,
      }),
    );

    // Completes actions that do not need to be awaited.
    const unawaitedUpdates: Promise<any> = Promise.all([
      createAttachments(config, clonedAttachments, client.lrs_id),
      voidStatements(config, unstoredModels, voidedObjectIds, client),
      updateReferences(config, unstoredModels, client),
      updateFullActivities({ config, models: unstoredModels, client }),
      config.repo.incrementStoreCount({ client, count: unstoredModels.length }),
    ]).catch((err) => {
      /* istanbul ignore next */
      config.logger.error('Error in unawaited updates', err);
    });

    await awaitUpdates(config, unawaitedUpdates);

    if (unstoredStatementProperties.length !== 0) {
      config.repo
        .emitNewStatements({
          statementProperties: unstoredStatementProperties,
          priority,
        })
        .catch((err) => {
          /* istanbul ignore next */
          console.error(err);
        });
    }

    const tracker = await config.tracker;
    tracker('batchSize', unstoredModels.length);
    tracker('sentBatchSize', models.length);

    return statementIds;
  };
};
