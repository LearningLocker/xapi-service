import assert from 'assert';
import Activity from '../../../models/Activity';
import Agent from '../../../models/Agent';
import Statement from '../../../models/Statement';
import getVerbsFromStatements
  from '../../../service/storeStatements/queriables/getVerbsFromStatement';

const VERB_ID = 'http://example.org/test-verb';

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
    id: VERB_ID,
  },
  object: {
    objectType: 'Activity',
    id: 'http://example.org/activity',
  } as Activity,
};

describe('create array of queriable verbs', () => {
  it('should return the verb from the statement', () => {
    const verbs = getVerbsFromStatements(statementDefaults);
    assert.deepEqual(verbs, [VERB_ID]);
  });
});
