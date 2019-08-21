import Actor from './Actor';

interface ClientModel {
  readonly _id: string;
  readonly title: string;
  readonly organisation: string;
  readonly lrs_id: string;
  readonly authority: Actor;
  readonly isTrusted: boolean;
  readonly scopes: string[];
}

export default ClientModel;
