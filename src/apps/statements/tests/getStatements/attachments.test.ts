import assertStatementsResult from '../utils/assertStatementsResult';
import attachmentsTest, { StatementCreator } from '../utils/attachmentsTest';
import createAttachmentStatement from '../utils/createAttachmentStatement';
import createAttachmentSubStatement from '../utils/createAttachmentSubStatement';
import createClientModel from '../utils/createClientModel';
import setup from '../utils/setup';

const TEST_CLIENT = createClientModel();

describe('get statements with attachments', () => {
  const service = setup();

  const testAttachments = (createStatement: StatementCreator) => {
    attachmentsTest(
      service,
      async (expectedIds, expectedAttachments) => {
        const result = await service.getStatements({
          client: TEST_CLIENT,
          attachments: true,
        });
        return assertStatementsResult(result, expectedIds, expectedAttachments);
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
