import Statement from './Statement';

export interface Ref { statement: Statement; }

interface UnstoredStatementModel {
  hasGeneratedId: boolean;
  organisation: string;
  client: string;
  lrs_id: string;
  person: string | null;
  active: boolean;
  voided: boolean;
  timestamp: Date;
  stored: Date;
  hash: string;
  agents: string[];
  relatedAgents: string[];
  verbs: string[];
  registrations: string[];
  activities: string[];
  relatedActivities: string[];
  statement: Statement;
  metadata: { [key: string]: any };
}

export default UnstoredStatementModel;
