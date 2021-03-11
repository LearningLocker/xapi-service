import { v4 as uuid } from 'uuid';
import Service from '../../serviceFactory/Service';
import createAttachment from '../utils/createAttachment';
import createAttachmentModel from '../utils/createAttachmentModel';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID_1 = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_ID_2 = '1c86d8e9-f325-404f-b3d9-24c451035583';
const TEST_FILE_URL_ATTACHMENT = createAttachment('A', 'http://www.example.com');

export type AttachmentAsserter = (
  expectedIds: string[],
  expectedAttachments: any[],
) => Promise<void>;

export type StatementCreator = (attachments: any[], id?: string) => any;

export default (
  service: Service,
  assertAttachments: AttachmentAsserter,
  createStatement: StatementCreator,
) => {
  const storeStatements = storeStatementsInService(service);

  it('should return an attachment when it is referenced once', async () => {
    // Randomly generates content to avoid flaky Google error with "rate of change requests".
    const contentA = uuid();
    const testAttachmentA = createAttachment(contentA);
    const testAttachmentModelA = createAttachmentModel(contentA);
    const testStatement = createStatement([testAttachmentA], TEST_ID_1);
    await storeStatements([testStatement], [testAttachmentModelA]);
    await assertAttachments([TEST_ID_1], [testAttachmentModelA]);
  });

  it('should not return an attachment when it is referenced via a fileURL', async () => {
    const testStatement = createStatement([TEST_FILE_URL_ATTACHMENT], TEST_ID_1);
    await storeStatements([testStatement], []);
    await assertAttachments([TEST_ID_1], []);
  });

  it('should return an attachment once when it is attached twice', async () => {
    // Randomly generates content to avoid flaky Google error with "rate of change requests".
    const contentA = uuid();
    const testAttachmentA = createAttachment(contentA);
    const testAttachmentModelA = createAttachmentModel(contentA);
    const testStatement = createStatement([testAttachmentA], TEST_ID_1);
    await storeStatements([testStatement], [testAttachmentModelA, testAttachmentModelA]);
    await assertAttachments([TEST_ID_1], [testAttachmentModelA]);
  });

  it('should return an attachment once when it is referenced twice and attached once', async () => {
    // Randomly generates content to avoid flaky Google error with "rate of change requests".
    const contentA = uuid();
    const testAttachmentA = createAttachment(contentA);
    const testAttachmentModelA = createAttachmentModel(contentA);
    const testStatement1 = createStatement([testAttachmentA], TEST_ID_1);
    const testStatement2 = createStatement([testAttachmentA], TEST_ID_2);
    await storeStatements([testStatement1, testStatement2], [testAttachmentModelA]);
    await assertAttachments([TEST_ID_2, TEST_ID_1], [testAttachmentModelA]);
  });

  it('should return an attachment once when it is referenced twice in one statement', async () => {
    // Randomly generates content to avoid flaky Google error with "rate of change requests".
    const contentA = uuid();
    const testAttachmentA = createAttachment(contentA);
    const testAttachmentModelA = createAttachmentModel(contentA);
    const testStatement = createStatement([testAttachmentA, testAttachmentA], TEST_ID_1);
    await storeStatements([testStatement], [testAttachmentModelA]);
    await assertAttachments([TEST_ID_1], [testAttachmentModelA]);
  });
};
