import assertStatementsResult from '../utils/assertStatementsResult';
import attachmentsTest, { StatementCreator } from '../utils/attachmentsTest';
import createAttachmentStatement from '../utils/createAttachmentStatement';
import createAttachmentSubStatement from '../utils/createAttachmentSubStatement';
import createClientModel from '../utils/createClientModel';
import setup from '../utils/setup';

const TEST_ID_1 = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_CLIENT = createClientModel();

describe('get statement with attachments', () => {
  const service = setup();

  const testAttachments = (createStatement: StatementCreator) => {
    attachmentsTest(
      service,
      async (_expectedIds, expectedAttachments) => {
        const result = await service.getStatement({
          client: TEST_CLIENT,
          attachments: true,
          id: TEST_ID_1,
          voided: false,
        });
        return assertStatementsResult(result, [TEST_ID_1], expectedAttachments);
      },
      createStatement,
    );
  };

  describe('in the statement', () => {
    testAttachments(createAttachmentStatement);
  });

  describe('in the sub statement', () => {
    testAttachments(createAttachmentSubStatement);
  });
});
