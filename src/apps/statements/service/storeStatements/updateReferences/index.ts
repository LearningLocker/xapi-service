import NoModel from 'jscommons/dist/errors/NoModel';
import { difference, get, has, includes, intersection, keys, pull, size, union } from 'lodash';
import logger from '../../../../../logger';
import MissingLoadedId from '../../../errors/MissingLoadedId';
import ClientModel from '../../../models/ClientModel';
import Statement from '../../../models/Statement';
import UnstoredStatementModel from '../../../models/UnstoredStatementModel';
import Config from '../../Config';
import {
  getAgentsFromStatement,
  getRelatedAgentsFromStatement,
} from '../queriables/getAgentsFromStatement';
import eagerLoadDownRefs from './eagerLoadDownRefs';
import eagerLoadUpRefs from './eagerLoadUpRefs';

import {
  getActivitiesFromStatement,
  getRelatedActivitiesFromStatement,
} from '../queriables/getActivitiesFromStatement';

import getRegistrationsFromStatement from '../queriables/getRegistrationsFromStatement';
import getVerbsFromStatement from '../queriables/getVerbsFromStatement';

const shortId = (id: string) => {
  return id[id.length - 1];
};

const shortIds = (ids: string[]) => {
  return `[${ids.map(shortId).join(',')}]`;
};

const stack = <T>(value: T, values: T[]): T[] => {
  return union([value], values);
};

export default async (config: Config, models: UnstoredStatementModel[], client: ClientModel) => {
  /* istanbul ignore next */
  if (!config.enableReferencing) { return; }

  const groupedUpRefIds = await eagerLoadUpRefs(config, models, client);
  const groupedDownRefs = await eagerLoadDownRefs(config, models, client);
  const groupedDownRefIds = keys(groupedDownRefs);

  if (size(groupedUpRefIds) === 0 && size(groupedDownRefs) === 0) { return; }

  const getDownRefId = (id: string): Promise<string> => {
    logger.debug('getDownRefId', shortId(id));
    return config.repo.getDownRefId({ id, client });
  };

  const getUpRefIds = async (id: string): Promise<string[]> => {
    if (has(groupedUpRefIds, id)) {
      logger.silly('getUpRefIds cached', shortId(id));
      return get(groupedUpRefIds, id, []);
    }
    logger.debug('getUpRefIds', shortId(id));
    return config.repo.getUpRefIds({ id, client });
  };

  const getDownRefs = async (targetIds: string[]): Promise<Statement[]> => {
    const loadedTargetIds = intersection(targetIds, groupedDownRefIds);
    const unloadedTargetIds = difference(targetIds, groupedDownRefIds);
    const loadedDownRefs = loadedTargetIds.map((targetId) => {
      if (has(groupedDownRefs, targetId)) {
        return groupedDownRefs[targetId];
      }
      /* istanbul ignore next */
      throw new MissingLoadedId(targetId);
    });
    const unloadedDownRefs = await config.repo.getStatementsByIds({
      ids: unloadedTargetIds,
      client,
    });

    logger.silly('getDownRefs cached', shortIds(loadedTargetIds));
    logger.silly('getDownRefs uncached', shortIds(unloadedTargetIds));
    return [...loadedDownRefs, ...unloadedDownRefs];
  };

  const setQueriables = async (id: string, givenRefIds: string[]): Promise<void> => {
    const refIds = pull(givenRefIds, id);
    const refs = await getDownRefs(refIds);
    logger.debug('setQueriables', shortId(id), shortIds(refIds));

    return config.repo.setQueriables({
      id,
      client,
      agents: union(...refs.map(getAgentsFromStatement)),
      relatedAgents: union(...refs.map(getRelatedAgentsFromStatement)),
      verbs: union(...refs.map(getVerbsFromStatement)),
      activities: union(...refs.map(getActivitiesFromStatement)),
      relatedActivities: union(...refs.map(getRelatedActivitiesFromStatement)),
      registrations: union(...refs.map(getRegistrationsFromStatement)),
    });
  };

  const traverseDown = async (modelId: string, visitedIds: string[]): Promise<string[]> => {
    logger.silly('traverseDown', shortId(modelId), shortIds(visitedIds));
    try {
      const newVisitedIds = stack(modelId, visitedIds);
      const downRefId = await getDownRefId(modelId);
      return (
        includes(newVisitedIds, downRefId) ?
          // tslint:disable-next-line:no-use-before-declare
          traverseUp([], newVisitedIds, downRefId) :
          traverseDown(downRefId, newVisitedIds)
      );
    } catch (err) {
      if (err.constructor === NoModel) {
        // tslint:disable-next-line:no-use-before-declare
        return traverseUp([], [], modelId);
      }
      /* istanbul ignore next */
      throw err;
    }
  };

  const traverseUp = async (
    visitedIds: string[],
    refIds: string[],
    modelId: string,
  ): Promise<string[]> => {
    logger.silly('traverseUp', shortIds(visitedIds), shortIds(refIds), shortId(modelId));
    if (includes(visitedIds, modelId)) { return []; }
    if (refIds.length > 0) { await setQueriables(modelId, refIds); }

    const newVisitedIds = stack(modelId, visitedIds);
    const newRefIds = stack(modelId, refIds);
    const upRefIds = await getUpRefIds(modelId);
    // tslint:disable-next-line:no-use-before-declare
    return traverseUpRefs(newVisitedIds, newRefIds, upRefIds);
  };

  const traverseUpRefs = async (
    visitedIds: string[],
    refIds: string[],
    upRefIds: string[],
  ): Promise<string[]> => {
    logger.silly('traverseUpRefs', shortIds(visitedIds), shortIds(refIds), shortIds(upRefIds));
    const traversedIds: string[][] = await Promise.all(upRefIds.map((upRefId) => {
      return traverseUp(visitedIds, refIds, upRefId);
    }));
    return union(visitedIds, refIds, ...traversedIds);
  };

  logger.debug('Updating references for storage');
  await models.reduce(async (results, model): Promise<string[]> => {
    const visitedIds = await results;
    const modelId = model.statement.id;
    logger.debug('Updating references', shortId(modelId));
    if (includes(visitedIds, modelId)) { return visitedIds; }

    if (model.statement.object.objectType !== 'StatementRef') {
      const traversedIds = await traverseUp([], [], modelId);
      return union(visitedIds, traversedIds);
    } else {
      const traversedIds = await traverseDown(modelId, []);
      return union(visitedIds, traversedIds);
    }
  }, Promise.resolve([]) as Promise<string[]>);
  // tslint:disable-next-line:max-file-line-count
};
