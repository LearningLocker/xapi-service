import GetStatementsOptions from '../../../serviceFactory/options/GetStatementsOptions';
import Service from '../../../serviceFactory/Service';

type FilteredStatementsAsserter = (service: Service) =>
  (opts: GetStatementsOptions, expectedIds: string[]) =>
    Promise<void>;

export default FilteredStatementsAsserter;
