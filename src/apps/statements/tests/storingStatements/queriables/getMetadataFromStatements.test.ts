import assert from 'assert';
import Activity from '../../../models/Activity';
import Agent from '../../../models/Agent';
import Statement from '../../../models/Statement';
// tslint:disable-next-line:import-spacing
import getMetadataFromStatement
  from '../../../service/storeStatements/queriables/getMetadataFromStatement';

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
  result: {
    duration: 'P1Y2M3DT4H5M6S',
  },
};

describe('create metadata with result duration', () => {
  it('should return result duration statement', () => {
    const metadata = getMetadataFromStatement(statementDefaults);
    assert.deepEqual(metadata, {
      'https://learninglocker&46;net/result-duration': { seconds: 37080306 },
    });
  });
});
