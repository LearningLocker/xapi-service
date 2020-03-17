import assert from 'assert';
import { isArray, isString } from 'lodash';

import ClientModel from '../../../models/ClientModel';
import Service from '../../../serviceFactory/Service';

export const assertStatementsPageResultsAndOrder = async (
  {
    service,
    client,
    expectedPageStatementIds,
    limit = 2,
    cursor,
    isNextPageCheckEnabled = true,
    ascending = false,
    /* Should start from 1 */
    pageNumber = 0,
  }: {
    readonly service: Service;
    readonly client: ClientModel;
    readonly expectedPageStatementIds: string[];
    readonly limit?: number;
    readonly isNextPageCheckEnabled?: boolean;
    readonly ascending?: boolean;
    readonly pageNumber?: number;
    readonly cursor?: string;
  },
) => {
  const pageResults = await service.getStatements({
    limit,
    client,
    ascending,
    cursor,
  });

  const pageNumberStringPartial = pageNumber > 0 ? ` #${pageNumber + 1}` : '';

  if (isNextPageCheckEnabled) {
    assert.equal(
      isString(pageResults.cursor),
      true,
      `Expected string cursor to page${pageNumberStringPartial}`,
    );
  } else {
    assert.equal(
      pageResults.cursor,
      undefined,
      'There shouldn\'t be any cursor to next page',
    );
  }

  assert(isArray(pageResults.statements), `Expected an array of statements for page${pageNumberStringPartial}`);

  const pageActualStatementIds = pageResults.statements.map((s) => s.id);

  assert.deepEqual(pageActualStatementIds, expectedPageStatementIds);

  return pageResults;
};
