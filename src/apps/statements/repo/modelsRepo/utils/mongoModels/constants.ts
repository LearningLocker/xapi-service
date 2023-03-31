import getNumberOption from 'jscommons/dist/config/getNumberOption';

export const STATEMENTS_COLLECTION_NAME = 'statements';
export const LRS_COLLECTION_NAME = 'lrs';
export const FULL_ACTIVITIES_COLLECTION_NAME = 'fullActivities';

const WRITE_CONCERN_DEFAULT = 3;
export const STORE_STATEMENT_WRITE_CONCERN_DEFAULT =
  process.env.STORE_STATEMENT_WRITE_CONCERN_DEFAULT === 'majority'
    ? process.env.STORE_STATEMENT_WRITE_CONCERN_DEFAULT
    : getNumberOption(process.env.STORE_STATEMENT_WRITE_CONCERN_DEFAULT, WRITE_CONCERN_DEFAULT);
