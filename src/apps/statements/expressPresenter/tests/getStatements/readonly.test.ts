import * as assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import { xapiHeaderVersion } from '../../../../activities/utils/constants';
import createStatement from '../../../tests/utils/createStatement';
import { jsonContentType, statementsRoute } from '../../../utils/constants';
import setupSurpertest from '../utils/setup';

describe('getStatements', () => {
  const { supertest } = setupSurpertest();
  const TEST_ID_1 = 'f2ec2bf0-d6bd-4013-a652-846315b3e240';
  const TEST_ID_2 = '60ccc696-4502-4a8b-896f-6c3dc1eb9639';

  it('should successfully return statement without readonly parameter', async () => {
    await supertest
      .post(statementsRoute)
      .set('Content-Type', jsonContentType)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .send([createStatement({ id: TEST_ID_1 })]);

    await supertest
      .get(statementsRoute)
      .set('Content-Type', jsonContentType)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .query({
        statementId: TEST_ID_1,
      })
      .expect((response) => {
        assert.deepStrictEqual(response.status, StatusCodes.OK);
        assert.deepStrictEqual(response.body.id, TEST_ID_1);
      });
  });

  it('should successfully return statement with readonly parameter', async () => {
    await supertest
      .post(statementsRoute)
      .set('Content-Type', jsonContentType)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .send([createStatement({ id: TEST_ID_1 })]);

    await supertest
      .get(statementsRoute)
      .set('Content-Type', jsonContentType)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .query({
        statementId: TEST_ID_1,
        readonly: 1,
      })
      .expect((response) => {
        assert.deepStrictEqual(response.status, StatusCodes.OK);
        assert.deepStrictEqual(response.body.id, TEST_ID_1);
      });
  });

  it('should successfully return multiple statements with readonly parameter', async () => {
    await supertest
      .post(statementsRoute)
      .set('Content-Type', jsonContentType)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .send([createStatement({ id: TEST_ID_1 }), createStatement({ id: TEST_ID_2 })]);

    await supertest
      .get(statementsRoute)
      .set('Content-Type', jsonContentType)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .query({
        readonly: 1,
      })
      .expect((response) => {
        assert.deepStrictEqual(response.status, StatusCodes.OK);
        const actualIds = response.body.statements.map((statement: any) => statement.id);
        assert.deepStrictEqual(actualIds.includes(TEST_ID_1, TEST_ID_2), true);
      });
  });
  it('should successfully return multiple statements without readonly parameter', async () => {
    await supertest
      .post(statementsRoute)
      .set('Content-Type', jsonContentType)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .send([createStatement({ id: TEST_ID_1 }), createStatement({ id: TEST_ID_2 })]);

    await supertest
      .get(statementsRoute)
      .set('Content-Type', jsonContentType)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .expect((response) => {
        assert.deepStrictEqual(response.status, StatusCodes.OK);
        const actualIds = response.body.statements.map((statement: any) => statement.id);
        assert.deepStrictEqual(actualIds.includes(TEST_ID_1, TEST_ID_2), true);
      });
  });
});
