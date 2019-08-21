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
const TEST_ACCOUNT = {
  homePage: 'HTTP://WWW.EXAMPLE.ORG/USER',
  name: 'TEST_USER',
};
const TEST_MBOX = 'MAILTO:TEST@EXAMPLE.ORG';
const TEST_OPENID = 'HTTP://WWW.EXAMPLE.ORG/USER/1';
const TEST_STATEMENT = {
  id: TEST_ID,
  actor: {
    objectType: 'Group',
    account: TEST_ACCOUNT,
    member: [{
      objectType: 'Agent',
      mbox: TEST_MBOX,
    }, {
      objectType: 'Agent',
      openid: TEST_OPENID,
    }],
  },
  verb: { id: 'http://www.example.org/verb' },
  object: {
    objectType: 'SubStatement',
    actor: {
      objectType: 'Group',
      account: TEST_ACCOUNT,
      member: [{
        objectType: 'Agent',
        mbox: TEST_MBOX,
      }, {
        objectType: 'Agent',
        openid: TEST_OPENID,
      }],
    },
    verb: { id: 'http://www.example.org/verb' },
    object: {
      objectType: 'Group',
      account: TEST_ACCOUNT,
      member: [{
        objectType: 'Agent',
        mbox: TEST_MBOX,
      }, {
        objectType: 'Agent',
        openid: TEST_OPENID,
      }],
    },
    context: {
      instructor: {
        objectType: 'Agent',
        mbox: TEST_MBOX,
      },
    },
  },
  context: {
    instructor: {
      objectType: 'Agent',
      account: TEST_ACCOUNT,
    },
  },
};
const EXPECTED_TEST_STATEMENT = {
  id: TEST_STATEMENT.id,
  actor: {
    objectType: TEST_STATEMENT.actor.objectType,
    account: {
      homePage: TEST_ACCOUNT.homePage.toLowerCase(),
      name: TEST_ACCOUNT.name.toLowerCase(),
    },
    member: [{
      objectType: TEST_STATEMENT.actor.member[0].objectType,
      mbox: TEST_MBOX.toLowerCase(),
    }, {
      objectType: TEST_STATEMENT.actor.member[1].objectType,
      openid: TEST_OPENID.toLowerCase(),
    }],
  },
  verb: TEST_STATEMENT.verb,
  object: {
    objectType: TEST_STATEMENT.object.objectType,
    actor: {
      objectType: TEST_STATEMENT.object.actor.objectType,
      account: {
        homePage: TEST_ACCOUNT.homePage.toLowerCase(),
        name: TEST_ACCOUNT.name.toLowerCase(),
      },
      member: [{
        objectType: TEST_STATEMENT.object.actor.member[0].objectType,
        mbox: TEST_MBOX.toLowerCase(),
      }, {
        objectType: TEST_STATEMENT.object.actor.member[1].objectType,
        openid: TEST_OPENID.toLowerCase(),
      }],
    },
    verb: TEST_STATEMENT.object.verb,
    object: {
      objectType: TEST_STATEMENT.object.object.objectType,
      account: {
        homePage: TEST_ACCOUNT.homePage.toLowerCase(),
        name: TEST_ACCOUNT.name.toLowerCase(),
      },
      member: [{
        objectType: TEST_STATEMENT.object.object.member[0].objectType,
        mbox: TEST_MBOX.toLowerCase(),
      }, {
        objectType: TEST_STATEMENT.object.object.member[1].objectType,
        openid: TEST_OPENID.toLowerCase(),
      }],
    },
    context: {
      instructor: {
        objectType: TEST_STATEMENT.object.context.instructor.objectType,
        mbox: TEST_MBOX.toLowerCase(),
      },
    },
  },
  context: {
    instructor: {
      objectType: TEST_STATEMENT.context.instructor.objectType,
      account: {
        homePage: TEST_ACCOUNT.homePage.toLowerCase(),
        name: TEST_ACCOUNT.name.toLowerCase(),
      },
    },
  },
};

describe(__filename, () => {
  const service = serviceFacade({
    ...config.statementsService,
    enableActorLowerCasing: true,
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

  it('should lower case IFIs with sub statements', async () => {
    await storeStatements([createStatement(TEST_STATEMENT)]);
    const actualStatement = await getStatement();
    assert.deepEqual(actualStatement, {
      ...actualStatement,
      ...EXPECTED_TEST_STATEMENT,
    });
  });

  it('should lower case IFIs without sub statements', async () => {
    const testStatement = {
      ...TEST_STATEMENT,
      object: TEST_STATEMENT.object.object,
    };
    const expectedStatement = {
      ...EXPECTED_TEST_STATEMENT,
      object: EXPECTED_TEST_STATEMENT.object.object,
    };
    await storeStatements([createStatement(testStatement)]);
    const actualStatement = await getStatement();
    assert.deepEqual(actualStatement, {
      ...actualStatement,
      ...expectedStatement,
    });
  });
  // tslint:disable-next-line:max-file-line-count
});
