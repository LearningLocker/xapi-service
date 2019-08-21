// import * as bluebird from 'bluebird';
// import * as promiseRetry from 'promise-retry';
import StoreStatementsOptions from '../../serviceFactory/options/StoreStatementsOptions';
import Service from '../../serviceFactory/Service';
// import createClientModel from '../utils/createClientModel';

// const TEST_CLIENT = createClientModel();

export default (service: Service) => {
  return async (opts: StoreStatementsOptions): Promise<string[]> => {
    const ids = await service.storeStatements(opts);
    // await Promise.all(ids.map((id) => {
    //   const promiser = () => {
    //     return bluebird.any([
    //       service.getStatement({
    //         id,
    //         voided: false,
    //         client: TEST_CLIENT,
    //       }),
    //       service.getStatement({
    //         id,
    //         voided: true,
    //         client: TEST_CLIENT,
    //       })
    //     ]);
    //   };
    //   const retryOptions = {
    //     retries: 5,
    //     factor: 2,
    //     minTimeout: 5000,
    //     maxTimeout: Infinity,
    //     randomize: 2
    //   };
    //   return promiseRetry(promiser, retryOptions);
    // }));
    return ids;
  };
};
