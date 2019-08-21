import assert from 'assert';
import { isArray } from 'lodash';

export default async (result: any, expectedIds: string[], expectedAttachments: any[]) => {
  const statements: any[] = result.statements;
  const attachments: any[] = result.attachments.map(({ hash }: any) => {
    return { hash };
  });
  assert(isArray(attachments));
  assert(isArray(statements));
  const actualIds = statements.map((statement) => {
    return statement.id;
  });
  assert.deepEqual(actualIds, expectedIds);
  assert.deepEqual(
    attachments,
    expectedAttachments.map(({ hash }: any) => {
      return { hash };
    }),
  );
};
