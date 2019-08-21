import assert from 'assert';
import Activity from '../../../models/Activity';
import Agent from '../../../models/Agent';
import Statement from '../../../models/Statement';
// tslint:disable-next-line:import-spacing
import getRegistrationsFromStatement
  from '../../../service/storeStatements/queriables/getRegistrationsFromStatement';

const REG = '1c86d8e9-f325-404f-b3d9-24c451035585';

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
  verb: {
    id: 'http://example.org/test-verb',
  },
  object: {
    objectType: 'Activity',
    id: 'http://example.org/activity',
  } as Activity,
};

const registrationStatement: Statement = {
  ...statementDefaults,
  context: {
    registration: REG,
  },
};

describe('create array of queriable registrations', () => {
  it('should return just the registration from the statement', () => {
    const registrations = getRegistrationsFromStatement(registrationStatement);
    assert.deepEqual(registrations, [REG]);
  });

  it('should return just an empty array from a statement with no registrations', () => {
    const registrations = getRegistrationsFromStatement(statementDefaults);
    assert.deepEqual(registrations, []);
  });
});
