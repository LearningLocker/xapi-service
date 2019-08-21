import assert from 'assert';
import config from '../../../../config';
import logger from '../../../../logger';
import tracker from '../../../../tracker';
import repo from '../../repo';
import serviceFacade from '../../service/index';
import createClientModel from '../utils/createClientModel';
import createStatement from '../utils/createStatement';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_CLIENT = createClientModel();
const TEST_STATEMENT = {
  id: TEST_ID,
  timestamp: null,
  stored: null,
  version: null,
  verb: {
    id: 'http://www.example.org/verb',
    display: {
      en: 'test_verb',
    },
  },
  actor: {
    account: {
      homePage: 'http://www.example.org/user',
      name: 'test_user',
    },
    objectType: 'Agent',
  },
  object: {
    objectType: 'Activity',
    id: 'http://www.example.org/object',
    definition: {
      type: 'http://www.example.org/test_object_type',
      extensions: null,
      name: {
        en: 'test_name',
      },
      description: {
        en: 'test_description',
      },
    },
  },
  result: null,
  context: {
    registration: null,
    revision: null,
    platform: 'test_platform',
    language: null,
    instructor: null,
    team: null,
    statement: null,
    contextActivities: {
      parent: [
        null,
        {
          objectType: 'Activity',
          id: 'http://www.example.org/object',
        },
      ],
    },
    extensions: null,
  },
  authority: null,
  attachments: null,
};
const EXPECTED_TEST_STATEMENT = {
  id: TEST_STATEMENT.id,
  actor: TEST_STATEMENT.actor,
  verb: TEST_STATEMENT.verb,
  object: {
    objectType: TEST_STATEMENT.object.objectType,
    id: TEST_STATEMENT.object.id,
    definition: {
      type: TEST_STATEMENT.object.definition.type,
      name: TEST_STATEMENT.object.definition.name,
      description: TEST_STATEMENT.object.definition.description,
    },
  },
  context: {
    platform: TEST_STATEMENT.context.platform,
    contextActivities: {
      parent: [TEST_STATEMENT.context.contextActivities.parent[1]],
    },
  },
};

describe(__filename, () => {
  const service = serviceFacade({
    ...config.statementsService,
    enableNullRemoval: true,
    repo,
    tracker,
    logger,
  });
  const storeStatements = storeStatementsInService(service);

  const getStatement = async () => {
    const result = await service.getStatement({ id: TEST_ID, voided: false, client: TEST_CLIENT });
    return result.statements[0];
  };

  beforeEach(async () => {
    await service.clearService();
  });

  it('should remove nulls when nulls are provided', async () => {
    await storeStatements([createStatement(TEST_STATEMENT)]);
    const actualStatement = await getStatement();
    assert.deepEqual(actualStatement, {
      ...actualStatement,
      ...EXPECTED_TEST_STATEMENT,
    });
  });
  // tslint:disable-next-line:max-file-line-count
});
