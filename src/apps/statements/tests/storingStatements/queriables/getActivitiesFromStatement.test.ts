import assert from 'assert';
import Activity from '../../../models/Activity';
import Agent from '../../../models/Agent';
import Statement from '../../../models/Statement';
import {
  getActivitiesFromStatement,
  getRelatedActivitiesFromStatement,
} from '../../../service/storeStatements/queriables/getActivitiesFromStatement';

const ACTIVITY_ID = 'http://example.org/test-activity';
const ACTIVITY_ID2 = 'http://example.org/test-activity2';
const ACTIVITY_ID3 = 'http://example.org/test-activity3';

const agent: Agent = {
  objectType: 'Agent',
  mbox: 'mailto:test@test.com',
};

const activity: Activity = {
  objectType: 'Activity',
  id: ACTIVITY_ID,
};

const statementDefaults: Statement = {
  id: 'testvalue',
  authority: agent,
  stored: 'testvalue',
  timestamp: 'testvalue',
  version: 'testvalue',
  actor: agent,
  object: activity,
  verb: {
    id: 'http://example.org/verb',
  },
};

const activity2: Activity = {
  objectType: 'Activity',
  id: ACTIVITY_ID2,
};
const activity3: Activity = {
  objectType: 'Activity',
  id: ACTIVITY_ID3,
};

const agentObjectModel: Statement = {
  ...statementDefaults,
  object: agent,
};

const activityObjectmodel: Statement = {
  ...statementDefaults,
  object: activity,
  context: {
    contextActivities: {
      parent: [
        activity,
      ],
      grouping: [
        activity,
        activity2,
      ],
      category: [],
    },
  },
};

const subStatementObjectmodel: Statement = {
  ...statementDefaults,
  object: {
    objectType: 'SubStatement',
    actor: agent,
    verb: {
      id: 'http://example.org/verb',
    },
    object: activity,
    context: activityObjectmodel.context,
  },
  context: {
    contextActivities: {
      parent: [
        activity3,
      ],
      grouping: [
      ],
      category: [],
      other: [],
    },
  },
};

describe('create array of queriable activities', () => {
  it('should return the non related activities', () => {
    const activities = getActivitiesFromStatement(activityObjectmodel);
    assert.deepEqual(activities, [ACTIVITY_ID]);
  });

  it('should return the related activities', () => {
    const activities = getRelatedActivitiesFromStatement(activityObjectmodel);
    assert.deepEqual(activities, [ACTIVITY_ID, ACTIVITY_ID2]);
  });

  it('should return the related activities with a substatement', () => {
    const activities = getRelatedActivitiesFromStatement(subStatementObjectmodel);
    assert.deepEqual(activities, [ACTIVITY_ID3, ACTIVITY_ID, ACTIVITY_ID2]);
  });

  it('should return no related activities from an agent object statement', () => {
    const activities = getRelatedActivitiesFromStatement(agentObjectModel);
    assert.deepEqual(activities, []);
  });
  // tslint:disable-next-line:max-file-line-count
});
