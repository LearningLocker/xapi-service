import Statement from './Statement';

export interface Ref { readonly statement: Statement; }

interface UnstoredStatementModel {
  readonly hasGeneratedId: boolean;
  readonly organisation: string;
  readonly client: string;
  readonly lrs_id: string;
  readonly person: string | null;
  readonly active: boolean;
  readonly voided: boolean;
  readonly timestamp: Date;
  readonly stored: Date;
  readonly hash: string;
  readonly agents: string[];
  readonly relatedAgents: string[];
  readonly verbs: string[];
  readonly registrations: string[];
  readonly activities: string[];
  readonly relatedActivities: string[];
  readonly statement: Statement;
  readonly metadata: { readonly [key: string]: any };
}

export default UnstoredStatementModel;
