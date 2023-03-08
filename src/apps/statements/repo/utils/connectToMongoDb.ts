import connectToDb from 'jscommons/dist/mongoRepo/utils/connectToDb';
import { once } from 'lodash';
import config from '../../../../config';
import logger from '../../../../logger';

export default once(
  connectToDb({
    dbName: config.mongoModelsRepo.dbName,
    logger,
    url: config.mongoModelsRepo.url,
  }),
);
