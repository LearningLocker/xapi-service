import { groupBy, mapValues } from 'lodash';
import { sha1 } from 'object-hash';
import AttachmentModel from '../../../models/AttachmentModel';
import ClientModel from '../../../models/ClientModel';
import UnstoredStatementModel from '../../../models/UnstoredStatementModel';
import {
  getActivitiesFromStatement,
  getRelatedActivitiesFromStatement,
} from '../queriables/getActivitiesFromStatement';
import {
  getAgentsFromStatement,
  getRelatedAgentsFromStatement,
} from '../queriables/getAgentsFromStatement';
import getMetadataFromStatement from '../queriables/getMetadataFromStatement';
import getRegistrationsFromStatement from '../queriables/getRegistrationsFromStatement';
import getVerbsFromStatement from '../queriables/getVerbsFromStatement';
import checkSignedStatements from './checkSignedStatements';
import setupObjectTypes from './setupObjectTypes';
import setupPostHashStatement from './setupPostHashStatement';
import setupPreHashStatement from './setupPreHashStatement';

export default async (
  models: any[],
  attachments: AttachmentModel[],
  client: ClientModel,
) => {
  const storedTime = new Date();
  const storedTimeString = storedTime.toISOString();

  const hashAttachmentDictionary = groupBy(attachments, (attachment) => {
    return attachment.hash;
  });
  const uniqueHashAttachmentDictionary = mapValues(
    hashAttachmentDictionary,
    (groupedAttachments) => {
      return groupedAttachments[0];
    },
  );

  const unstoredModelPromises = models.map(
    async (model: any): Promise<UnstoredStatementModel> => {
      const objectTypesModel = setupObjectTypes(model);
      await checkSignedStatements(
        objectTypesModel,
        uniqueHashAttachmentDictionary,
      );
      const preHashStatement = setupPreHashStatement(objectTypesModel);
      const fullStatementWithID = { ...objectTypesModel, ...preHashStatement };
      const postHashStatement = setupPostHashStatement(
        fullStatementWithID,
        storedTimeString,
        client.authority,
      );
      const timestampTime = new Date(postHashStatement.timestamp);

      return {
        hasGeneratedId: model.id === undefined,
        organisation: client.organisation,
        lrs_id: client.lrs_id,
        client: client._id,
        person: null,
        active: true,
        voided: false,
        timestamp: timestampTime,
        stored: storedTime,
        hash: sha1(preHashStatement),
        agents: getAgentsFromStatement(postHashStatement),
        relatedAgents: getRelatedAgentsFromStatement(postHashStatement),
        registrations: getRegistrationsFromStatement(postHashStatement),
        verbs: getVerbsFromStatement(postHashStatement),
        activities: getActivitiesFromStatement(postHashStatement),
        relatedActivities: getRelatedActivitiesFromStatement(postHashStatement),
        statement: postHashStatement,
        metadata: getMetadataFromStatement(postHashStatement),
      };
    },
  );

  return await Promise.all(unstoredModelPromises);
};
