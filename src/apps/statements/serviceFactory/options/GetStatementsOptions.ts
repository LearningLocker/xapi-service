import ClientModel from '../../models/ClientModel';
import FilterAgent from '../../models/FilterAgent';
import StatementsResultOptions from './StatementsResultOptions';

interface GetStatementsOptions extends StatementsResultOptions {
  readonly agent?: FilterAgent;
  readonly activity?: string;
  readonly verb?: string;
  readonly related_agents?: boolean;
  readonly related_activities?: boolean;
  readonly registration?: string;
  readonly since?: string;
  readonly until?: string;
  readonly ascending?: boolean;
  readonly limit?: number;
  readonly skip?: number;
  readonly client: ClientModel;
  readonly cursor?: string;
}

export default GetStatementsOptions;
