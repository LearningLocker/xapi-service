import ClientModel from '../../models/ClientModel';
import FilterAgent from '../../models/FilterAgent';
import StatementsResultOptions from './StatementsResultOptions';

interface GetStatementsOptions extends StatementsResultOptions {
  agent?: FilterAgent;
  activity?: string;
  verb?: string;
  related_agents?: boolean;
  related_activities?: boolean;
  registration?: string;
  since?: string;
  until?: string;
  ascending?: boolean;
  limit?: number;
  skip?: number;
  client: ClientModel;
  cursor?: string;
}

export default GetStatementsOptions;
