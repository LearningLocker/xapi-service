import assert from 'assert';
import Activity from '../../../models/Activity';
import Actor from '../../../models/Actor';
import Agent from '../../../models/Agent';
import Context from '../../../models/Context';
import Group from '../../../models/Group';
import Statement from '../../../models/Statement';
import SubStatement from '../../../models/SubStatement';
import {
  getAgentsFromStatement,
  getRelatedAgentsFromStatement,
} from '../../../service/storeStatements/queriables/getAgentsFromStatement';

const ACTIVITY_ID = 'http://example.org/test-activity';

const activity: Activity = {
  objectType: 'Activity',
  id: ACTIVITY_ID,
};

const statementDefaults: Statement = {
  id: 'testvalue',
  authority: {
    objectType: 'Agent',
    mbox: 'mailto:authority@test.com',
  },
  stored: 'testvalue',
  timestamp: 'testvalue',
  version: 'testvalue',
  actor: {
    objectType: 'Agent',
    mbox: 'mailto:actor@test.com',
  } as Agent,
  object: activity,
  verb: {
    id: 'http://example.org/verb',
  },
};

const agentObjectModel: Statement = {
  ...statementDefaults,
  object: {
    objectType: 'Agent',
    mbox: 'mailto:objectagent@test.com',
  },
};

const activityObjectModel: Statement = {
  ...statementDefaults,
  object: activity,
  context: {
    team: {
      objectType: 'Group',
      mbox: 'mailto:team@test.com',
      member: [
        { objectType: 'Agent', mbox: 'mailto:teammember@test.com' },
      ],
    },
    instructor: {
      objectType: 'Agent',
      mbox: 'mailto:instructor@test.com',
    },
  },
};

const subStatementObjectModel: Statement = {
  ...statementDefaults,
  object: {
    objectType: 'SubStatement',
    actor: {
      objectType: 'Agent',
      mbox: 'mailto:ssactor@test.com',
    } as Agent,
    verb: {
      id: 'http://example.org/verb',
    },
    object: activity,
    context: activityObjectModel.context,
  },
  context: {
    team: {
      objectType: 'Group',
      mbox: 'mailto:ssteam@test.com',
      member: [
        { objectType: 'Agent', mbox: 'mailto:ssteammember@test.com' },
      ],
    },
    instructor: {
      objectType: 'Agent',
      mbox: 'mailto:ssinstructor@test.com',
    },
  },
};

describe('create array of queriable agents', () => {
  it('should return the non related agents', () => {
    const idents = getAgentsFromStatement(agentObjectModel);
    const agentObj = agentObjectModel.object as Agent;
    assert.deepEqual(idents, [
      agentObjectModel.actor.mbox,
      agentObj.mbox,
    ]);
  });

  it('should return the related activities', () => {
    const idents = getRelatedAgentsFromStatement(activityObjectModel);
    const context = activityObjectModel.context as Context;
    const team = context.team as Group;
    const member = team.member as Actor[];
    const instructor = context.instructor as Agent;
    assert.deepEqual(idents, [
      activityObjectModel.actor.mbox,
      team.mbox,
      ...member.map((m) => m.mbox),
      instructor.mbox,
      activityObjectModel.authority.mbox,
    ]);
  });

  it('should return the related activities with a substatement', () => {
    const idents = getRelatedAgentsFromStatement(subStatementObjectModel);
    const context = subStatementObjectModel.context as Context;
    const team = context.team as Group;
    const member = team.member as Actor[];
    const instructor = context.instructor as Agent;

    const ssobject = subStatementObjectModel.object as SubStatement;
    const sscontext = ssobject.context as Context;
    const ssteam = sscontext.team as Group;
    const ssmember = ssteam.member as Actor[];
    const ssinstructor = sscontext.instructor as Agent;
    assert.deepEqual(idents, [
      subStatementObjectModel.actor.mbox,

      team.mbox,
      ...member.map((m) => m.mbox),
      instructor.mbox,
      subStatementObjectModel.authority.mbox,

      ssobject.actor.mbox,
      ssteam.mbox,
      ...ssmember.map((m) => m.mbox),
      ssinstructor.mbox,
    ]);
  });
  // tslint:disable-next-line:max-file-line-count
});
